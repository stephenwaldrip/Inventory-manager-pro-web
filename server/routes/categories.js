// server/routes/categories.js
const express = require('express');
const router = express.Router();

let categories = []; // In-memory storage
let idCounter = 1;

router.get('/', (req, res) => {
  res.json(categories);
});

router.post('/', (req, res) => {
  const newCategory = { _id: idCounter++, name: req.body.name };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = categories.findIndex((c) => c._id === id);
  if (index !== -1) {
    categories[index].name = req.body.name;
    res.json(categories[index]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  categories = categories.filter((c) => c._id !== id);
  res.status(204).end();
});

module.exports = router;
