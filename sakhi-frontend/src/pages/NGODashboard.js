// src/pages/NGODashboard.js
import React, { useEffect, useState, useContext, useCallback } from "react";
import api from "../axiosConfig";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

const RequestRow = ({ r, onTake, taking }) => {
  const loc = r.location || r.address || r.city || "—";
  const days = r.days || r.duration || r.preferredDuration || r.numDays || "—";
  const victim = r.name || r.anonymousName || "Anonymous";
  const details = r.currentSituation || r.message || r.description || "No details provided";
  return (
    <tr>
      <td style={{ width: "18%" }}>{victim}</td>
      <td className="wrap-col">{details}</td>
      <td>{r.contactMethod || r.contact || "—"}</td>
      <td>{loc}</td>
      <td>{days}</td>
      <td>
        <button className="btn small" onClick={() => onTake(r._id || r.id)} disabled={taking}>
          {taking ? "Taking..." : "Take"}
        </button>
      </td>
    </tr>
  );
};

const NGODashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [tab, setTab] = useState("help");
  const [pendingHelp, setPendingHelp] = useState([]);
  const [pendingAccom, setPendingAccom] = useState([]);
  const [assignedHelp, setAssignedHelp] = useState([]);
  const [assignedAccom, setAssignedAccom] = useState([]);
  const [loading, setLoading] = useState(false);
  const [takingIds, setTakingIds] = useState(new Set());
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  // local auth helper
  const getLocalAuth = () => {
    const raw = localStorage.getItem("sakhi_auth");
    if (!raw) return { token: null, id: null, raw: null };
    try {
      const parsed = JSON.parse(raw);
      const token = parsed.token || parsed.accessToken || null;
      const id = parsed.id || parsed._id || (parsed.user && (parsed.user._id || parsed.user.id)) || null;
      return { token, id, raw: parsed };
    } catch {
      return { token: null, id: null, raw };
    }
  };

  const matchAssignedToMe = (assignedTo, myId) => {
    if (!assignedTo || !myId) return false;
    if (typeof assignedTo === "string") return assignedTo === myId;
    if (typeof assignedTo === "object") {
      return assignedTo._id === myId || assignedTo.id === myId || (assignedTo.toString && assignedTo.toString() === myId);
    }
    return false;
  };

  const loadAll = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    const auth = getLocalAuth();
    const token = auth.token;
    const base = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const urls = {
      helpPending: `${base}/api/help/pending`,
      accomPending: `${base}/api/accommodation/pending`,
      helpAll: `${base}/api/help/all`,
      accomAll: `${base}/api/accommodation/all`,
    };

    try {
      const headers = token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
      const doFetch = async (url) => {
        const resp = await fetch(url, { headers });
        const text = await resp.text();
        try { return { status: resp.status, body: JSON.parse(text) }; }
        catch { return { status: resp.status, body: text }; }
      };

      const [hp, ap, ha, aa] = await Promise.all([
        doFetch(urls.helpPending).catch(() => ({ status: 0, body: [] })),
        doFetch(urls.accomPending).catch(() => ({ status: 0, body: [] })),
        doFetch(urls.helpAll).catch(() => ({ status: 0, body: [] })),
        doFetch(urls.accomAll).catch(() => ({ status: 0, body: [] })),
      ]);

      const normalizeBody = (resp) => {
        if (!resp || resp.body == null) return [];
        const b = resp.body;
        if (Array.isArray(b)) return b;
        if (Array.isArray(b.data)) return b.data;
        if (Array.isArray(b.requests)) return b.requests;
        if (Array.isArray(b.helpRequests)) return b.helpRequests;
        if (Array.isArray(b.accommodationRequests)) return b.accommodationRequests;
        return [];
      };

      const hpArr = normalizeBody(hp);
      const apArr = normalizeBody(ap);
      const haArr = normalizeBody(ha);
      const aaArr = normalizeBody(aa);

      const derivedPendingHelp = hpArr.length > 0 ? hpArr : haArr.filter((it) => (it.status || "pending") === "pending" && !it.assignedTo);
      const derivedPendingAccom = apArr.length > 0 ? apArr : aaArr.filter((it) => (it.status || "pending") === "pending" && !it.assignedTo);

      const assignedHelpArr = haArr.filter((it) => matchAssignedToMe(it.assignedTo, auth.id));
      const assignedAccomArr = aaArr.filter((it) => matchAssignedToMe(it.assignedTo, auth.id));

      setPendingHelp(derivedPendingHelp);
      setPendingAccom(derivedPendingAccom);
      setAssignedHelp(assignedHelpArr);
      setAssignedAccom(assignedAccomArr);

      if (derivedPendingHelp.length === 0 && derivedPendingAccom.length === 0 && haArr.length === 0 && aaArr.length === 0) {
        setErrorMsg("No data returned by server for endpoints. Check server logs/permissions.");
      }
    } catch (err) {
      console.error("loadAll error", err);
      setErrorMsg("Unexpected error while loading data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadAll();
    // eslint-disable-next-line
  }, [user, loadAll]);

  const take = async (url, id, setter) => {
    const auth = getLocalAuth();
    const token = auth.token;
    try {
      setTakingIds((prev) => new Set(prev).add(id));
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        await api.post(url, {}, { headers });
      } catch {
        // fallback fetch
        const base = process.env.REACT_APP_API_URL || "http://localhost:5000";
        const full = url.startsWith("http") ? url : `${base}${url}`;
        const resp = await fetch(full, {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        if (!resp.ok) throw new Error(`server ${resp.status}`);
      }
      setter((prev) => prev.filter((r) => (r._id || r.id) !== id));
      await loadAll();
    } catch (err) {
      console.error("take error", err);
      alert("Failed to take request. Check console/network.");
    } finally {
      setTakingIds((prev) => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });
    }
  };

  const takeHelp = (id) => take(`/api/help/${id}/take`, id, setPendingHelp);
  const takeAccom = (id) => take(`/api/accommodation/${id}/take`, id, setPendingAccom);

  return (
    <div className="admin-wrapper" style={{ maxWidth: 1100, margin: "20px auto" }}>
      <header className="admin-header" style={{ marginBottom: 18 }}>
        <div>
          <h2 style={{ margin: 0 }}>NGO Dashboard</h2>
          <div className="subtitle">Signed in as: <strong>{user?.email}</strong></div>
        </div>
        <div className="header-actions">
          <select value={tab} onChange={(e) => setTab(e.target.value)} className="view-select" aria-label="Switch view">
            <option value="help">Help Requests</option>
            <option value="accom">Accommodation Requests</option>
            <option value="assigned">Assigned to me</option>
          </select>
          <button className="refresh small" onClick={loadAll}>Refresh</button>
          <button className="logout" onClick={() => { logout(); navigate("/login"); }}>Logout</button>
        </div>
      </header>

      {loading && <div className="loading">Loading…</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      {/* show only active tab as a large pill heading */}
      <nav style={{ marginBottom: 12 }}>
        <div className="active-pill">{tab === "help" ? "Help Requests" : tab === "accom" ? "Accommodation Requests" : "Assigned to me"}</div>
      </nav>

      {tab === "help" && (
        <section className="card">
          <h3>Pending Help Requests</h3>
          {pendingHelp.length === 0 ? <p className="muted">No pending help requests</p> : (
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Victim</th><th>Details</th><th>Contact</th><th>Location</th><th>Days</th><th>Action</th></tr></thead>
                <tbody>
                  {pendingHelp.map(r => <RequestRow key={r._id || r.id} r={r} onTake={takeHelp} taking={takingIds.has(r._id || r.id)} />)}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {tab === "accom" && (
        <section className="card">
          <h3>Pending Accommodation Requests</h3>
          {pendingAccom.length === 0 ? <p className="muted">No pending accommodation requests</p> : (
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Victim</th><th>Details</th><th>Contact</th><th>Location</th><th>Days</th><th>Action</th></tr></thead>
                <tbody>
                  {pendingAccom.map(r => <RequestRow key={r._id || r.id} r={r} onTake={takeAccom} taking={takingIds.has(r._id || r.id)} />)}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {tab === "assigned" && (
        <>
          <section className="card">
            <h3>Help requests assigned to you</h3>
            {assignedHelp.length === 0 ? <p className="muted">No assigned help requests</p> : (
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Victim</th><th>Details</th><th>Contact</th><th>Location</th><th>Status</th></tr></thead>
                  <tbody>
                    {assignedHelp.map(r => (
                      <tr key={r._id || r.id}>
                        <td>{r.name || "Anonymous"}</td>
                        <td className="wrap-col">{r.currentSituation || r.message || r.description || "—"}</td>
                        <td>{r.contactMethod || r.contact || "—"}</td>
                        <td>{r.address || r.location || "—"}</td>
                        <td>{r.status || "assigned"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="card">
            <h3>Accommodation requests assigned to you</h3>
            {assignedAccom.length === 0 ? <p className="muted">No assigned accommodation requests</p> : (
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Victim</th><th>Details</th><th>Contact</th><th>Location</th><th>Status</th></tr></thead>
                  <tbody>
                    {assignedAccom.map(r => (
                      <tr key={r._id || r.id}>
                        <td>{r.name || "Anonymous"}</td>
                        <td className="wrap-col">{r.currentSituation || r.message || r.description || "—"}</td>
                        <td>{r.contactMethod || r.contact || "—"}</td>
                        <td>{r.address || r.location || "—"}</td>
                        <td>{r.status || "assigned"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default NGODashboard;
