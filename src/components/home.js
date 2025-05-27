import React from 'react';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to DreamWeaver Travels</h1>
            <p>Your adventure begins here! Explore our featured destinations and travel packages.</p>
            <div className="featured-destinations">
                <h2>Featured Destinations</h2>
                <ul>
                    <li>Paris, France</li>
                    <li>Bali, Indonesia</li>
                    <li>New York City, USA</li>
                    <li>Tokyo, Japan</li>
                    <li>Rome, Italy</li>
                </ul>
            </div>
            <div className="travel-packages">
                <h2>Travel Packages</h2>
                <p>Check out our exclusive travel packages designed just for you!</p>
                <button>View Packages</button>
            </div>
        </div>
    );
};

export default Home;