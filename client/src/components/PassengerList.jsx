import React, { useEffect, useState } from 'react';
import axios from 'axios';


const PassengerList = () => {
    const [passengers, setPassengers] = useState([]);

    useEffect(() => {
        const fetchPassengers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/passengers');
                setPassengers(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPassengers();
    }, []);

    return (
        <div className="table-container">
            <h1>Passenger List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Bus Number</th>
                        <th>Route</th>
                        <th>Ticket Price</th>
                        <th>Selected Seats</th>
                        <th>Booking Date</th>
                    </tr>
                </thead>
                <tbody>
                    {passengers.map((passenger, index) => (
                        <tr key={index}>
                            <td>{passenger.name}</td>
                            <td>{passenger.email}</td>
                            <td>{passenger.phone}</td>
                            <td>{passenger.busNumber}</td>
                            <td>{passenger.route}</td>
                            <td>{passenger.ticket_price}</td>
                            <td>{passenger.selectedSeats.join(', ')}</td>
                            <td>{new Date(passenger.bookingDate).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PassengerList;
