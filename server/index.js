const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Bus = require('./models/Bus.js');
const Passenger = require('./models/Passenger.js');
const Conductor = require('./models/Conductor.js');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/bus-reservation', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

app.get('/buses', async (req, res) => {
    try {
        const buses = await Bus.find({});
        res.json(buses);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/buses/:busNumber', async (req, res) => {
    try {
        const buses = await Bus.find({busNumber: req.params.busNumber});
        res.json(buses);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/passengers', async (req, res) => {
    try {
        const passengers = await Passenger.find();
        res.json(passengers);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/buy-ticket', async (req, res) => {
    const { busNumber, email, name, phone, selectedSeats, totalPrice } = req.body;
    console.log({ name, email, phone, busNumber, selectedSeats, totalPrice });  

    try {
        const bus = await Bus.findOne({ busNumber }); // Find the bus by busNumber
        if (bus.availableSeats >= selectedSeats.length) {
            // Decrease available seats by the number of selected seats
            bus.availableSeats -= selectedSeats.length; 
            
            // Mark selected seats as booked (true) in the seats array
            selectedSeats.forEach(seatIndex => {
                bus.seats[seatIndex] = true; // Set the seat at the index to true
            });

            await bus.save(); // Save the updated bus details

            // Create a new passenger instance
            const passenger = new Passenger({
                name,
                email,
                phone,
                busNumber,
                route: bus.route, // Assuming you have the route in your bus document
                ticket_price: totalPrice,
                selectedSeats,
            });

            await passenger.save(); // Save the passenger details

            res.status(200).json({ message: 'Ticket purchased successfully!' });
        } else {
            res.status(400).json({ message: 'Not enough available seats.' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});



const seedData = async () => {
    

    // Create sample conductors
    // const conductors = Array.from({ length: 10 }, (_, index) => ({
    //     name: `Conductor ${index + 1}`
    // }));
    // const insertedConductors = await Conductor.insertMany(conductors);

    // Create sample buses
    const buses = Array.from({ length: 10 }, (_, index) => ({
        // busNumber: `BUS${index + 1}`,
        // conductorId: insertedConductors[index]._id,
        // totalSeats: 50,
        // availableSeats: 50,
        // route: `Route ${index + 1}`,
        // images: `https://t4.ftcdn.net/jpg/00/15/53/79/360_F_15537925_5qUqgBbDSQHCI5DeP7M0z88ouNIHdeKY.jpg`
        price: index + 1
    }));
    await Bus.insertMany(buses);

    // Create sample passengers
    // const passengers = Array.from({ length: 10 }, (_, index) => ({
    //     name: `Passenger ${index + 1}`,
    //     email: `passenger${index + 1}@example.com`,
    //     phone: `12345678${index}`
    // }));
    await Passenger.insertMany(passengers);

    console.log('Seed data inserted');
    mongoose.connection.close();
};

// seedData();



const addPriceToBuses = async () => {
    try {
        // Get all buses
        const buses = await Bus.find();

        // Update each bus with a price
        const updates = buses.map(bus => {
            const seats = Array(bus.totalSeats).fill(false); // Generate a random price between 20 and 119
            return Bus.updateOne({ _id: bus._id }, { seats}); // Update the price
        });

        // Execute all updates
        await Promise.all(updates);
        
        console.log('Prices added to all buses');
    } catch (error) {
        console.error('Error updating buses:', error);
    } finally {
        mongoose.connection.close();
    }
};

// addPriceToBuses();



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
