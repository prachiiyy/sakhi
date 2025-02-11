import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import girl from "../assets/girl.jpg";

const Herosec = () => {
    return (
        <section>
            <div className='Helplinecode'>
                <span className='helpline'>
                    Contact us 24/7: 1-800-72544-38
                </span>
            </div>

            <div className='Herosection'>
                <div className='hero-text'>
                    <h2>Domestic violence affects 30% of women in India.</h2>
                    <p>
                        If you or someone you know is experiencing abuse, know that help is available. 
                        You are not alone, and there's nothing to be afraid of. Your safety and well-being 
                        are our priority, and all information shared will be kept strictly confidential.
                    </p>
                    
                    <div className='hero-buttons'>
                        <Link to="/get-help">
                            <button className="primary-button">Get Help Now</button>
                        </Link>
                        <Link to="/learn-more">
                            <button className='secondary-button'>Learn More</button>
                        </Link>
                    </div>
                </div>

                <div className='hero-image'>
                    <img src={girl} alt="A smiling woman" className='hero-img' />
                </div>
            </div>
        </section>
    );
};

export default Herosec;