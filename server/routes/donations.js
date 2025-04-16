const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// Process donation
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, amount, method } = req.body;
        
        const donation = new Donation({
            name,
            email,
            phone,
            amount,
            method,
            status: 'pending'
        });
        
        await donation.save();
        
        // Generate payment URL based on method
        let paymentUrl = '';
        if (method === 'esewa') {
            paymentUrl = generateEsewaUrl(donation._id, amount);
        } else if (method === 'khalti') {
            paymentUrl = generateKhaltiUrl(donation._id, amount);
        }
        
        res.json({
            success: true,
            paymentUrl,
            donationId: donation._id
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: 'Donation processing failed' 
        });
    }
});

function generateEsewaUrl(donationId, amount) {
    // Implement eSewa payment URL generation
    return `https://esewa.com.np/pay?amount=${amount}&donationId=${donationId}`;
}

function generateKhaltiUrl(donationId, amount) {
    // Implement Khalti payment URL generation
    return `https://khalti.com/payment/?amount=${amount}&donationId=${donationId}`;
}

module.exports = router;