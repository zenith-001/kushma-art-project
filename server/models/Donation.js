const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    amount: { type: Number, required: true },
    method: { 
        type: String, 
        required: true,
        enum: ['esewa', 'khalti', 'card'] 
    },
    status: { 
        type: String, 
        default: 'pending',
        enum: ['pending', 'completed', 'failed'] 
    },
    transactionId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);