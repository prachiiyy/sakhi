import React from "react";
import { Link } from "react-router-dom";
import '../style.css';
import woman from "../assets/woman.png";

const Mission = () => {
    return (
        <section className="mission-section">
            <div className="mission-container">
              
                <div className="mission-image">
                    <img src={woman} alt="Supportive Woman" className="missionPic" />
                </div>

                <div className="mission-text">
                    <h2>Providing Holistic Support & Resources</h2>
                    <p>
                        Our mission is to empower survivors of domestic violence by providing access to 
                        critical support services, resources, and information in a safe and user-friendly 
                        online environment. We believe in the importance of raising awareness, promoting 
                        education, and fostering community collaboration to address the root causes of 
                        domestic violence and create a future free from abuse.
                    </p>

                    <Link to="/learn-more">
                        <button className="primary-button mission-button">Learn More</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Mission;