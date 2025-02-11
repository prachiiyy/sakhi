import React from "react";
import Form1 from "../forms/Form1";
import '../form.css';

const Form1page = () => {
    return (
        <>
            <main className="formpage-container">
                
                <section className="form-header">
                    <h1 className="form-title">Accommodation</h1>
                    <p className="form-subtext">
                        Safe, temporary accommodation for women and children escaping domestic abuse, 
                        with emotional support and guidance.
                    </p>
                </section>

                <section className="form-content">
                    <Form1 />
                </section>
            </main>
        </>
    );
};

export default Form1page;