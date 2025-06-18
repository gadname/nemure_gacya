const express = require('express');
const searchService = require('../services/searchService');
const router = express.Router();

// GET /api/search?q=your query
router.get('/', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter q' });
  }

  try {
    const results = await searchService.searchWeb(query);
    res.json(results);
  } catch (err) {
    console.error('Search service error', err);
    res.status(500).json({ error: 'Search service error', details: err.message });
  }
});

module.exports = router;
