const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        
        const formattedEvents = events.map(event => ({
            title: event.title_en,
            title_np: event.title_np,
            description: event.description_en,
            description_np: event.description_np,
            start: event.startDate,
            end: event.endDate,
            location: event.location,
            image: event.imageUrl
        }));
        
        res.json(formattedEvents);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching events' });
    }
});

module.exports = router;