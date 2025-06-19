// routes/materials.js
const express = require('express');
const router = express.Router();

let materials = []; // In-memory database
let idCounter = 1;

router.get('/', (req, res) => {
  res.json(materials);
});

router.post('/', (req, res) => {
  const { name, partNumber } = req.body;

  if (!name || !partNumber) {
    return res.status(400).json({ error: 'Name and part number are required.' });
  }

  const duplicate = materials.find(m => m.partNumber === partNumber);
  if (duplicate) {
    return res.status(409).json({ error: 'Part number must be unique.' });
  }

  const newMat = {
    _id: idCounter++,
    name,
    partNumber
  };

  materials.push(newMat);
  res.status(201).json(newMat);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, partNumber } = req.body;

  const index = materials.findIndex((m) => m._id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Material not found' });
  }

  // If the part number is being changed, check for uniqueness
  const duplicate = materials.find(m => m.partNumber === partNumber && m._id !== id);
  if (duplicate) {
    return res.status(409).json({ error: 'Part number must be unique.' });
  }

  materials[index] = { ...materials[index], name, partNumber };
  res.json(materials[index]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const exists = materials.some((m) => m._id === id);

  if (!exists) {
    return res.status(404).json({ error: 'Material not found' });
  }

  materials = materials.filter((m) => m._id !== id);
  res.status(204).end();
});

module.exports = router;
