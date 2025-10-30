// src/pages/AdminDashboard.js
import React, { useEffect, useState, useContext } from "react";
import {
  getPendingNgos,
  getAllNgos,
  approveNgo,
  getAllHelpRequests,
  getAllAccommodationRequests,
  getAllDonations,
} from "../api/adminApi";
import "../Dashboard.css";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const TabBtn = ({ active, onClick, children }) => (
  <button className={`tab-btn ${active ? "active" : ""}`} onClick={onClick}>
    {children}
  </button>
);

const AdminDashboard = () => {
  const [tab, setTab] = useState("ngos");
  const [pendingNgos, setPendingNgos] = useState([]);
  const [allNgos, setAllNgos] = useState([]);
  const [helpRequests, setHelpRequests] = useState([]);
  const [accomRequests, setAccomRequests] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Ensure consistent array shape
  const ensureArray = (maybeRes) => {
    if (!maybeRes) return [];
    if (maybeRes.data !== undefined) {
      const d = maybeRes.data;
      if (Array.isArray(d)) return d;
      const keys = Object.keys(d || {});
      for (let k of keys) if (Array.isArray(d[k])) return d[k];
      return [];
    }
    if (Array.isArray(maybeRes)) return maybeRes;
    const keys = Object.keys(maybeRes || {});
    for (let k of keys) if (Array.isArray(maybeRes[k])) return maybeRes[k];
    return [];
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadAll();
  }, [user]); // eslint-disable-line

  const loadAll = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const [pRes, aRes, hRes, acRes, dRes] = await Promise.all([
        getPendingNgos().catch(() => ({ data: [] })),
        getAllNgos().catch(() => ({ data: [] })),
        getAllHelpRequests().catch(() => ({ data: [] })),
        getAllAccommodationRequests().catch(() => ({ data: [] })),
        getAllDonations().catch(() => ({ data: [] })),
      ]);

      setPendingNgos(ensureArray(pRes));
      setAllNgos(ensureArray(aRes));
      setHelpRequests(ensureArray(hRes));
      setAccomRequests(ensureArray(acRes));
      setDonations(ensureArray(dRes));
    } catch (err) {
      console.error("Dashboard data load error", err);
      setErrorMsg("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      await approveNgo(id);
      await loadAll();
    } catch (err) {
      console.error("Approve NGO error", err);
      alert("Failed to approve NGO. See console.");
    } finally {
      setLoading(false);
    }
  };

  const doLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-wrapper">
      <header className="admin-header">
        <div>
          <h1 className="brand">🌸 Sakhi — Admin Dashboard</h1>
          <div className="subtitle">Manage NGOs, Requests & Donations</div>
        </div>

        <div className="header-actions">
          <div className="signed-in">
            Signed in as: <strong>{user?.email || "admin"}</strong>
          </div>
          <button className="logout" onClick={doLogout}>Logout</button>
        </div>
      </header>

      <nav className="admin-tabs">
        <TabBtn active={tab === "ngos"} onClick={() => setTab("ngos")}>NGOs</TabBtn>
        <TabBtn active={tab === "help"} onClick={() => setTab("help")}>Help Requests</TabBtn>
        <TabBtn active={tab === "accom"} onClick={() => setTab("accom")}>Accommodation</TabBtn>
        <TabBtn active={tab === "don"} onClick={() => setTab("don")}>Donations</TabBtn>
        <button className="refresh" onClick={loadAll}>Refresh</button>
      </nav>

      <main className="admin-main">
        {loading && <div className="loading">Loading...</div>}
        {errorMsg && <div className="error">{errorMsg}</div>}

        {/* NGOs TAB */}
        {tab === "ngos" && (
          <>
            <section className="card">
              <h2>Pending NGOs</h2>
              {pendingNgos.length === 0 ? (
                <p className="muted">No pending NGOs.</p>
              ) : (
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr><th>Name</th><th>Email</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {pendingNgos.map((n) => (
                        <tr key={n._id || n.id || n.email}>
                          <td>{n.name || "—"}</td>
                          <td>{n.email || "—"}</td>
                          <td>
                            <button className="btn small" onClick={() => handleApprove(n._id || n.id)}>
                              Approve
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="card">
              <h2>All NGOs</h2>
              {allNgos.length === 0 ? (
                <p className="muted">No NGOs found.</p>
              ) : (
                <div className="table-wrap">
                  <table className="table">
                    <thead><tr><th>Name</th><th>Email</th><th>Approved</th></tr></thead>
                    <tbody>
                      {allNgos.map((n) => (
                        <tr key={n._id || n.id || n.email}>
                          <td>{n.name || "—"}</td>
                          <td>{n.email || "—"}</td>
                          <td>{n.isApproved || n.approved || n.status === "approved" ? "✅ Yes" : "❌ No"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        {/* HELP TAB */}
        {tab === "help" && (
          <section className="card">
            <h2>Help Requests</h2>
            {helpRequests.length === 0 ? (
              <p className="muted">No help requests.</p>
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Victim</th><th>Contact</th><th>Assigned</th><th>Status</th></tr></thead>
                  <tbody>
                    {helpRequests.map((r) => (
                      <tr key={r._id || r.id}>
                        <td>{r.name || r.anonymousName || "Anonymous"}</td>
                        <td>{r.contactNumber || r.contact || "—"}</td>
                        <td>{r.assignedTo ? (r.assignedTo.name || r.assignedTo) : "—"}</td>
                        <td>{(r.status || (r.assignedTo ? "taken" : "pending")).toUpperCase()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* ACCOM TAB */}
        {tab === "accom" && (
          <section className="card">
            <h2>Accommodation Requests</h2>
            {accomRequests.length === 0 ? (
              <p className="muted">No accommodation requests.</p>
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Victim</th><th>Location</th><th>Days</th><th>Assigned</th><th>Status</th></tr></thead>
                  <tbody>
                    {accomRequests.map((r) => {
                      const loc = r.location || r.address || r.city || "—";
                      const days = r.days || r.duration || r.numDays || r.preferredDuration || "—";
                      return (
                        <tr key={r._id || r.id}>
                          <td>{r.name || "Anonymous"}</td>
                          <td>{loc}</td>
                          <td>{days}</td>
                          <td>{r.assignedTo ? (r.assignedTo.name || r.assignedTo) : "—"}</td>
                          <td>{(r.status || (r.assignedTo ? "assigned" : "pending")).toLowerCase()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* DONATIONS TAB */}
        {tab === "don" && (
          <section className="card">
            <h2>Donations</h2>
            {donations.length === 0 ? (
              <p className="muted">No donations recorded.</p>
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr><th>Cardholder Name</th><th>Amount</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {donations.map((d) => (
                      <tr key={d._id || d.id}>
                        <td>{d.cardholderName || "—"}</td>
                        <td>{d.amount || "—"}</td>
                        <td>{new Date(d.createdAt || d.date || Date.now()).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
