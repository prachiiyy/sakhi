import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../style.css";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    orgDetails: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const base = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const payload = {
        name: form.name,
        orgDetails: form.orgDetails,
        email: form.email,
        password: form.password,
      };

      const res = await axios.post(`${base}/api/auth/register`, payload);

      // success: backend should respond with created user or message
      setMessage(res.data?.message || "Registration successful! Redirecting to login...");
      // small delay then redirect
      setTimeout(() => navigate("/login"), 1400);
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <label>NGO Name</label>
          <input
            name="name"
            placeholder="Organization name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Organization Details</label>
          <textarea
            name="orgDetails"
            placeholder="Describe your NGO’s work"
            value={form.orgDetails}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error">{error}</p>}
          {message && <p className="info">{message}</p>}

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="switch-auth">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
