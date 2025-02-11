import React from "react";
import { Link } from "react-router-dom";
import "../style.css";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className="footer">
            
            <div className="footer-details">
                <img src={logo} alt="Sakhi Logo" className="footer-logo" />
                <p className="footer-tagline">
                    Empowering Lives, Ending Silence: Together Against Domestic Violence
                </p>
                <div className="social-icons">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="2x" className="social-icon instagram" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size="2x" className="social-icon facebook" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size="2x" className="social-icon twitter" />
                    </a>
                </div>
            </div>

            <div className="footer-links">
                <h3>Quick Links</h3>
                <ul>
                    <li><Link to="/" className="footer-link">Home</Link></li>
                    <li><Link to="/learn-more" className="footer-link">About Us</Link></li>
                    <li><Link to="/footer" className="footer-link">Contact</Link></li>
                    <li><Link to="/donate" className="footer-link">Donate</Link></li>
                </ul>
            </div>

            <div className="footer-contact">
                <h3>Contact Us</h3>
                <div className="contact-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
                    <p>Prayagraj, India</p>
                </div>
                <div className="contact-item">
                    <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                    <p>1-800-72544-38</p>
                </div>
                <div className="contact-item">
                    <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                    <p><a href="mailto:support@sakhiDV.org" className="footer-email">support@sakhiDV.org</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;