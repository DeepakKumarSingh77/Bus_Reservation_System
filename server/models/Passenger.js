const mongoose = require('mongoose');

const PassengerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    busNumber:String,
    route: String,
    ticket_price: Number,
    selectedSeats: [Number],
    bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Passenger', PassengerSchema);
