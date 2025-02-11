import React from "react";
import '../style.css';

const Newsletter = () => {
    return (
        <section className="newsletter-section">
            <div className="newsletter-container">
                <h2 className="newsletter-title">Newsletter Subscription</h2>
                <p className="newsletter-text">
                    Subscribe to our newsletter to get updates on women's rights and important articles.
                </p>

                <form className="newsletter-form">
                    <label htmlFor="email" className="hidden-label"></label>
                    <input 
                        type="email" 
                        id="email"
                        className="newsletter-input" 
                        placeholder="Enter your email address" 
                        required 
                    />
                    <button type="submit" className="subscribe-button">Subscribe</button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
