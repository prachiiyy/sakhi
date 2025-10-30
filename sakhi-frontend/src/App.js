import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Herosec from "./components/Herosec";
import Features from "./components/Features";
import Mission from "./components/Mission";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import Formpage from "./pages/Formpage";
import Form1page from "./pages/Form1page";
import DonatePage from "./pages/DonatePage";
import Homepage from "./pages/Homepage";

// New pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import NGODashboard from "./pages/NGODashboard";
import { AuthProvider } from "./AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/get-help" element={<Formpage />} />
            <Route path="/accommodation" element={<Form1page />} />
            <Route path="/learn-more" element={<Mission />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/ngo" element={<NGODashboard />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
