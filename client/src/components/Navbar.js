import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
    const handleLogout = async () => {
        try {
            const res = await fetch('/auth/logout', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json', }, });
            onLogout();
        } catch (err) {
            alert("server error!");
            console.error('logout error:', err);
        }
    };

    return (
        <nav className="navbar" role="navigation">
            {!isLoggedIn && <div>
                <ul class="flex justify-end space-x-4 pr-2 pt-4">
                    <li class="bg-pink-300 p-2 rounded"><Link to="/login">log in</Link></li>
                    <li class="bg-pink-300 p-2 rounded"><Link to="/signup">sign up</Link></li>
                </ul>

            </div>}
            {isLoggedIn && <div className="navbar-right">
                <ul class="flex justify-end space-x-4 pr-2 pt-4">
                    <li class="bg-pink-300 p-2 rounded"><Link to="/favorites">favorites</Link></li>
                    <li class="bg-pink-300 p-2 rounded"><button onClick={handleLogout}>log out</button></li>
                </ul>
            </div>}
        </nav>
    );
};

export default Navbar;