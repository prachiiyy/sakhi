import React, { useState } from "react";
import api from '../axiosConfig';
import '../form.css';

const Form1 = () => {
    const [userHelp, setUserHelp] = useState({
        name: "",
        contactMethod: "",
        contactNumber: "",
        address: "",
        currentSituation: "",
        safetyConcerns: "",
        children: "",
        legalInformation: "",
        preferredDuration: "",
        languagePreferences: "",
        transportationNeeds: false,
        consent: false
    });

    const [statusMessage, setStatusMessage] = useState("");

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setUserHelp({ ...userHelp, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("https://sakhi-backend-jroa.onrender.com/api/accommodation/submit", userHelp);
            setStatusMessage("Accommodation request submitted successfully!");
            console.log(response.data);

            setUserHelp({
                name: "",
                contactMethod: "",
                contactNumber: "",
                address: "",
                currentSituation: "",
                safetyConcerns: "",
                children: "",
                legalInformation: "",
                preferredDuration: "",
                languagePreferences: "",
                transportationNeeds: false,
                consent: false
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatusMessage("Error submitting form. Please try again.");
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
                    <label htmlFor="contactMethod">How should we contact you?</label>
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
                    <label htmlFor="currentSituation">Current Living Condition</label>
                    <textarea id="currentSituation" name="currentSituation" value={userHelp.currentSituation} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="safetyConcerns">Safety Concerns</label>
                    <input type="text" id="safetyConcerns" name="safetyConcerns" value={userHelp.safetyConcerns} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="children">Children or dependencies</label>
                    <input type="text" id="children" name="children" value={userHelp.children} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="legalInformation">Legal Information</label>
                    <textarea id="legalInformation" name="legalInformation" value={userHelp.legalInformation} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="preferredDuration">Preferred duration of accommodation</label>
                    <input type="text" id="preferredDuration" name="preferredDuration" value={userHelp.preferredDuration} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="languagePreferences">Language preferences</label>
                    <input type="text" id="languagePreferences" name="languagePreferences" value={userHelp.languagePreferences} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="transportationNeeds">Transportation needs?</label>
                    <input type="checkbox" id="transportationNeeds" name="transportationNeeds" checked={userHelp.transportationNeeds} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="consentToStoreData">Confirm consent to store and process provided information</label>
                    <input type="checkbox" id="consentToStoreData" name="consentToStoreData" checked={userHelp.consentToStoreData} onChange={handleInput} />
                </div>
                <button type="submit">Submit</button>
            </form>
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
};

export default Form1;