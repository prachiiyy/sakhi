import React, { useState } from "react";
import axios from "axios";
import '../donate.css';

const Donateform = () => {
    const [payment, setPayment] = useState({
        cardName: "",
        cardNumber: "",
        cvv: "",
        expMonth: "",
        expYear: "",
        amount: "",
    });

    const [statusMessage, setStatusMessage] = useState("");

    const handleInput = (e) => {
        setPayment({ ...payment, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const donationData = {
                cardholderName: payment.cardName,
                expirationMonth: payment.expMonth,
                expirationYear: payment.expYear,
                amount: payment.amount
            };

            const response = await axios.post("https://sakhi-backend-jroa.onrender.com/api/donation/create", donationData);
            setStatusMessage("Donation processed successfully!");
            console.log(response.data);

            setPayment({
                cardName: "",
                cardNumber: "",
                cvv: "",
                expMonth: "",
                expYear: "",
                amount: "",
            });
        } catch (error) {
            console.error("Error processing donation:", error);
            setStatusMessage("Error processing donation. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="cardName">Cardholder Name</label>
                <input type="text" name="cardName" id="cardName" value={payment.cardName} onChange={handleInput} required />
            </div>
            <div>
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" name="cardNumber" id="cardNumber" value={payment.cardNumber} onChange={handleInput} required />
            </div>
            <div>
                <label htmlFor="cvv">CVV</label>
                <input type="text" name="cvv" id="cvv" value={payment.cvv} onChange={handleInput} required />
            </div>
            <div>
                <label htmlFor="expMonth">Expiration Month</label>
                <input type="text" name="expMonth" id="expMonth" value={payment.expMonth} onChange={handleInput} required />
            </div>
            <div>
                <label htmlFor="expYear">Expiration Year</label>
                <input type="text" name="expYear" id="expYear" value={payment.expYear} onChange={handleInput} required />
            </div>
            <div>
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" id="amount" value={payment.amount} onChange={handleInput} required />
            </div>
            <button type="submit">Donate</button>
            {statusMessage && <p>{statusMessage}</p>}
        </form>
    );
};

export default Donateform;