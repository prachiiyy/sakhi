import React from "react";
import Donateform from "../forms/Donateform";
import motherImage from "../assets/mother.jpg";
import '../donate.css';

const DonatePage = () => {
    return (
        <>
            <main className="donate-container">
                <section className="donate-header">
                    <h1 className="donate-title">Donate</h1>
                    <p className="donate-text">
                        Your donation can make a life-changing difference for survivors of domestic violence.
                        With your support, we can provide critical services such as safe accommodation,
                        counseling, legal assistance, and empowerment resources to those in need.
                    </p>
                </section>
                <div className="image-form-container">
                    <div className="donate-image-container">
                        <img src={motherImage} alt="Supportive Mother" className="donation-image" />
                    </div>
                    <div className="donate-form-container">
                        <Donateform />
                    </div>
                </div>
            </main>
        </>
    );
};

export default DonatePage;