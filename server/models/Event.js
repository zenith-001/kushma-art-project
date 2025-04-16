const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title_en: { type: String, required: true },
    title_np: { type: String, required: true },
    description_en: { type: String, required: true },
    description_np: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);