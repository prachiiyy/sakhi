import React from "react";
import Herosec from "../components/Herosec";
import Features from "../components/Features";
import Mission from "../components/Mission";
import Newsletter from "../components/Newsletter";

const Homepage = () => {
    return (
        <main>
            <Herosec />
            <Features />
            <Mission />
            <Newsletter />
        </main>
    );
};

export default Homepage;