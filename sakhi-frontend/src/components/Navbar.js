import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import logo from "../assets/logo.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className='NavbarContainer'>
  
            <div className='logo'>
                <Link to="/">
                    <img src={logo} alt="SAKHI" className='logoImg' />
                </Link>
            </div>

            <div className={`navButtons ${menuOpen ? "open" : ""}`}>
                <ul>
                    <li>
                        <Link to="/" className='nav-link'>Home</Link>
                    </li>
                    <li>
                        <Link to="/learn-more" className='nav-link'>About</Link>
                    </li>
                    <li>
                        <Link to="/footer" className='nav-link'>Contact</Link>
                    </li>
                    <li>
                        <Link to="/donate">
                            <button className='donate-button'>Donate</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;