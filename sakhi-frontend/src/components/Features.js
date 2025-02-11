import React from "react";
import { Link } from "react-router-dom"; // Use Link for navigation
import "../style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBalanceScale, faUserShield, faUsers, faBook } from "@fortawesome/free-solid-svg-icons";

const Features = () => {
    return (
        <section className="Features">
            <div className="Features1">
                <h2 className="ques">How can we help you today?</h2>

                <div className="features-grid">
                    
                    <Link to="/get-help" className="feature-card">
                        <FontAwesomeIcon icon={faUserShield} size="2x" />
                        <p>Opt for Help</p>
                    </Link>

                    <Link to="/accommodation" className="feature-card">
                        <FontAwesomeIcon icon={faHome} size="2x" />
                        <p>Residence</p>
                    </Link>

                    
                    <Link to="/legal-assistance" className="feature-card">
                        <FontAwesomeIcon icon={faBalanceScale} size="2x" />
                        <p>Legal Assistance</p>
                    </Link>

                    <Link to="/counselling" className="feature-card">
                        <FontAwesomeIcon icon={faUsers} size="2x" />
                        <p>Confidential Counselling</p>
                    </Link>

                    
                    <Link to="/community-resources" className="feature-card">
                        <FontAwesomeIcon icon={faUsers} size="2x" />
                        <p>Community Resources</p>
                    </Link>

                    <Link to="/your-rights" className="feature-card">
                        <FontAwesomeIcon icon={faBook} size="2x" />
                        <p>Know About Your Rights</p>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Features;