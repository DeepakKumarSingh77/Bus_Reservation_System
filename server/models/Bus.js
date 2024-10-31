const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
    busNumber: String,
    conductorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conductor' },
    totalSeats: Number,
    availableSeats: Number,
    route: String,
    images: String,
    price: {
        type: Number,
        default: 0
    },
    seats: {
        type: [Boolean], // Array of booleans to represent seat availability
        default: () => Array(50).fill(false) // Assuming 50 seats, all initially available
    }
});

module.exports = mongoose.model('Bus', BusSchema);
