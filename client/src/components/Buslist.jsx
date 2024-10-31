import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Buslist = () => {
    const [buses, setBuses] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const res = await axios.get('http://localhost:5000/buses');
                setBuses(res.data);
                console.log(res.data);
            } catch (err) {
                setError('Error fetching buses');
                console.error(err);
            }
        };
        fetchBuses();
    }, []);

    const handleBooking = (bus) => {
        const queryParams = new URLSearchParams({
            busNumber: bus.busNumber,
        }).toString();

        navigate(`/passenger-details?${queryParams}`); // Navigate with query parameters
    };

    if (error) return <div className="error">{error}</div>;

    return (
        <div className="buslist-container">
            <h1>Buses</h1>
            <div className="bus-cards">
                {buses.length === 0 ? (
                    <p>No buses available.</p>
                ) : (
                    buses.map(bus => (
                        <div className="bus-card" key={bus._id}>
                            <img src={bus.images} alt={`Bus ${bus.busNumber}`} className="bus-image" />
                            <h2 style={{ fontWeight: 'bold', color: 'black' }}>Bus Number: {bus.busNumber}</h2>
                            <p style={{ fontWeight: 'bold', color: 'black' }}><strong>Available Seats:</strong> {bus.availableSeats}</p>
                            <p style={{ fontWeight: 'bold', color: 'black' }}>{bus.route}</p>
                            {bus.availableSeats > 0 ? (
                                <button className="booking-button" onClick={() => handleBooking(bus)}>
                                    Book Now
                                </button>
                            ) : (
                                <p style={{ color: 'red' }}>Fully Booked</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Buslist;
