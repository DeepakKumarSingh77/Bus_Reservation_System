import React from 'react';


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="logo" style={{ color: 'white' }}>Bus Booking</h1>
                <ul className="menu">
                    <li className="menu-item"><a href="/">Home</a></li>
                    <li className="menu-item"><a href="/passengers">Booking</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
