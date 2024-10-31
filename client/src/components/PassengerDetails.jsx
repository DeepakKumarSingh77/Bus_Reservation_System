import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PassengerDetails = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]); // Track selected seats
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [bus, setBus] = useState(null);
     console.log(selectedSeats);
    const busNumber = searchParams.get('busNumber');

    useEffect(() => {
        const fetchBus = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/buses/${busNumber}`);
                setBus(res.data[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBus();
    }, [busNumber]);

    const handleSeatSelect = (index) => {
        setSelectedSeats((prevSelected) => {
            // Check if the seat is already selected
            if (prevSelected.includes(index)) {
                // If selected, deselect it
                return prevSelected.filter(seat => seat !== index);
            } else {
                // Otherwise, select it
                return [...prevSelected, index];
            }
        });
    };

    const totalPrice = selectedSeats.length * (bus ? bus.price : 0); // Calculate total price

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, email, phone, busNumber, selectedSeats, totalPrice });
        const fetchBus = async () => {
            try {
                const res = await axios.post(`http://localhost:5000/buy-ticket`, {
                    name,
                    email,
                    phone,
                    busNumber,
                    selectedSeats,
                    totalPrice      
                });
                alert('Booking successful!');
                navigate('/');
            } catch (err) {
                console.error(err);
                alert('Try Again some error will be occured');
            }
        };
        fetchBus();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', width: '100vw'}}>
            <div className="passenger-details-container">
                <h1>Passenger Details</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
                    <div>
                        <label>Name:</label>
                        <input style={{ width: '300px',marginLeft:"20px"}} type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input style={{ width: '300px',marginLeft:"20px"}} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input style={{ width: '300px',marginLeft:"20px"}} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    {bus && (
                        <>
                            <p style={{ color: "black", fontSize: "19px" }}>Journey Price per Seat: <span style={{ color: "red" }}>{bus.price}</span></p>
                            <p>Bus Number: {busNumber}</p>
                            <p style={{ color: "black", fontSize: "19px" }}>Available Seats:</p>
                            <div className="seat-container">
                                {bus.seats.map((available, index) => available === false ? (
                                    <div 
                                        key={index} 
                                        className={`seat-box ${selectedSeats.includes(index) ? 'selected' : ''}`} 
                                        onClick={() => handleSeatSelect(index)}
                                    >
                                        Seat {index + 1}
                                    </div>
                                ) : null)}
                            </div>
                            <p style={{ color: "black", fontSize: "19px" }}>Total Price: <span style={{ color: "red" }}>{totalPrice}</span></p>
                        </>
                    )}
                    <button type="submit" disabled={selectedSeats.length === 0}>Pay</button>
                </form>
            </div>
        </div>
    );
};

export default PassengerDetails;
