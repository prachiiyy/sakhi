// src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import logo from "../assets/logo.png";
import { AuthContext } from '../AuthContext';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className='NavbarContainer'>
            <div className='logo'>
                <Link to="/">
                    <img src={logo} alt="SAKHI" className='logoImg' />
                </Link>
            </div>

            <div className={`navButtons ${menuOpen ? "open" : ""}`}>
                <ul>
                    <li><Link to="/" className='nav-link'>Home</Link></li>
                    <li><Link to="/learn-more" className='nav-link'>About</Link></li>
                    <li><Link to="/footer" className='nav-link'>Contact</Link></li>
                    {user?.role === 'admin' && <li><Link to="/admin" className='nav-link'>Admin</Link></li>}
                    {user?.role === 'ngo' && <li><Link to="/ngo" className='nav-link'>NGO Dashboard</Link></li>}
                    {!user && <li><Link to="/login" className='nav-link'>Login</Link></li>}
                    <li>
                        <Link to="/donate">
                            <button className='donate-button'>Donate</button>
                        </Link>
                    </li>
                    {user && <li><button className='btn-ghost' onClick={() => { logout(); window.location.href = '/'; }}>Logout</button></li>}
                </ul>
            </div>

            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
        </nav>
    );
};

export default Navbar;
