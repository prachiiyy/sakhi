import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Herosec from "./components/Herosec";
import Features from "./components/Features";
import Mission from "./components/Mission"; // Used for Learn More page
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

// Import pages correctly
import Formpage from "./pages/Formpage";
import Form1page from "./pages/Form1page";
import DonatePage from "./pages/DonatePage";
import Homepage from "./pages/Homepage"; // Create a Homepage component for structure

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/get-help" element={<Formpage />} />
          <Route path="/accommodation" element={<Form1page />} />
          <Route path="/learn-more" element={<Mission />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;