import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import "../style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ngo");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // use environment base URL if present
      const base = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await axios.post(`${base}/api/auth/login`, {
        email,
        password,
      });

      // backend expected: { token, user: { _id, role, name, email, isApproved } }
      const serverUser = res.data.user || {};
      const userData = {
        token: res.data.token,
        id: serverUser._id || serverUser.id || null,   // store DB id for matching assignedTo
        role: serverUser.role || role,
        name: serverUser.name || "User",
        email: serverUser.email || email,
        isApproved: serverUser.isApproved === undefined ? true : serverUser.isApproved,
      };

      // If backend returns 200 but NGO not approved, show message and do not navigate to NGO dashboard.
      if (userData.role === "ngo" && userData.isApproved === false) {
        setError("Your NGO account is not approved yet by the admin.");
        setLoading(false);
        return;
      }

      // Persist in context + localStorage (AuthContext.login handles localStorage)
      login(userData);

      // Redirect based on role
      if (userData.role === "admin") navigate("/admin");
      else navigate("/ngo");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      const status = err.response?.status;
      if (status === 403) setError("Your NGO account is not yet approved by the admin.");
      else if (status === 401) setError("Invalid email or password.");
      else setError(err.response?.data?.message || "Login failed. Check your credentials or server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="ngo">NGO</option>
            <option value="admin">Admin</option>
          </select>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="switch-auth">
          Don't have an account? <Link to="/signup">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
