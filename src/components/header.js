import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <h1>DreamWeaver Travels</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#destinations">Destinations</a></li>
                    <li><a href="#packages">Travel Packages</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;