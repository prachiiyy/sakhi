import React, { useState } from "react";
import axios from "axios"; 
import '../form.css';

const Form = () => {
    const [userHelp, setUserHelp] = useState({
        name: "",
        contactMethod: "",
        contactNumber: "",
        address: "",
        currentSituation: "",
        safetyConcerns: "",
        children: "",
        historyOfAbuse: "",
        message: "",
        physicalHealth: "",
        contactedBefore: false,
        legalAssistance: false,
        confidentialCounselling: false,
    });

    const [statusMessage, setStatusMessage] = useState("");

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setUserHelp({ ...userHelp, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/help/submit", userHelp);
            setStatusMessage("Form submitted successfully!");
            console.log(response.data);
            
            setUserHelp({
                name: "",
                contactMethod: "",
                contactNumber: "",
                address: "",
                currentSituation: "",
                safetyConcerns: "",
                children: "",
                historyOfAbuse: "",
                message: "",
                physicalHealth: "",
                contactedBefore: false,
                legalAssistance: false,
                confidentialCounselling: false,
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatusMessage("Failed to submit the form. Please try again.");
        }
    };

    return (
        <div className="help-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={userHelp.name} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="contactMethod">Contact Method</label>
                    <input type="text" id="contactMethod" name="contactMethod" value={userHelp.contactMethod} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input type="text" id="contactNumber" name="contactNumber" value={userHelp.contactNumber} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" value={userHelp.address} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="currentSituation">Current Situation</label>
                    <textarea id="currentSituation" name="currentSituation" value={userHelp.currentSituation} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="safetyConcerns">Safety Concerns</label>
                    <input type="text" id="safetyConcerns" name="safetyConcerns" value={userHelp.safetyConcerns} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="children">Children or Dependencies</label>
                    <input type="text" id="children" name="children" value={userHelp.children} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="historyOfAbuse">History of Abuse</label>
                    <textarea id="historyOfAbuse" name="historyOfAbuse" value={userHelp.historyOfAbuse} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message for the Team</label>
                    <textarea id="message" name="message" value={userHelp.message} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="physicalHealth">Describe Physical and Emotional Health</label>
                    <textarea id="physicalHealth" name="physicalHealth" value={userHelp.physicalHealth} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="contactedBefore">Have you contacted us before?</label>
                    <input type="checkbox" id="contactedBefore" name="contactedBefore" checked={userHelp.contactedBefore} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="legalAssistance">Want legal assistance?</label>
                    <input type="checkbox" id="legalAssistance" name="legalAssistance" checked={userHelp.legalAssistance} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="confidentialCounselling">Want confidential counselling services?</label>
                    <input type="checkbox" id="confidentialCounselling" name="confidentialCounselling" checked={userHelp.confidentialCounselling} onChange={handleInput} />
                </div>
                <button type="submit">Submit</button>
            </form>
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
};

export default Form;