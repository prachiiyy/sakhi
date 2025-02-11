import React from "react";
import Form from "../forms/Form";
import '../form.css';

const Formpage = () => {
    return (
        <>
            <main className="formpage-container">
           
                <section className="form-header">
                    <h1 className="form-title">Opt for Help</h1>
                    <p className="form-subtext">
                        If you are seeking support, call the Helpline. You can also contact the Helpline 
                        - in confidence - via the form below.
                    </p>
                </section>

                <section className="form-content">
                    <Form />
                </section>
            </main>
        </>
    );
};
export default Formpage;