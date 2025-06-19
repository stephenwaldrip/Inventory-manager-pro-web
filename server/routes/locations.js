const express = require('express');
const router = express.Router();

let locations = []; // In-memory location store
let idCounter = 1;

// Get all locations
router.get('/', (req, res) => {
  res.json(locations);
});

// Add a new location
router.post('/', (req, res) => {
  const newLoc = { _id: idCounter++, name: req.body.name };
  locations.push(newLoc);
  res.status(201).json(newLoc);
});

// Update a location by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = locations.findIndex((l) => l._id === id);
  if (index !== -1) {
    locations[index].name = req.body.name;
    res.json(locations[index]);
  } else {
    res.status(404).json({ error: 'Location not found' });
  }
});

// Delete a location by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  locations = locations.filter((l) => l._id !== id);
  res.status(204).end();
});

module.exports = router;
