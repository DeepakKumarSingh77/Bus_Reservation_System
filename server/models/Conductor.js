const mongoose = require('mongoose');

const ConductorSchema = new mongoose.Schema({
    name: String,
    busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
});

module.exports = mongoose.model('Conductor', ConductorSchema);
