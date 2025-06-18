const express = require('express');
const birdService = require('../services/birdService');
const router = express.Router();

// GET /api/birds
router.get('/', (req, res) => {
  const birds = birdService.getAllBirds();
  res.json(birds);
});

// GET /api/birds/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const bird = birdService.getBirdById(id);
  if (bird) {
    res.json(bird);
  } else {
    res.status(404).json({ error: 'Bird not found' });
  }
});

// POST /api/birds
router.post('/', (req, res) => {
  const birdData = req.body;
  const newBird = birdService.createBird(birdData);
  res.status(201).json(newBird);
});

// PUT /api/birds/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const birdData = req.body;
  const updatedBird = birdService.updateBird(id, birdData);
  if (updatedBird) {
    res.json(updatedBird);
  } else {
    res.status(404).json({ error: 'Bird not found' });
  }
});

// DELETE /api/birds/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deleted = birdService.deleteBird(id);
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Bird not found' });
  }
});

module.exports = router;
