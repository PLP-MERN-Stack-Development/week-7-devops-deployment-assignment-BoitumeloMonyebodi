// server/routes/bugRoutes.js

const express = require('express');
const router = express.Router();
const Bug = require('../models/bugModel');

// GET all bugs
router.get('/', async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.status(200).json(bugs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bugs' });
  }
});

// POST new bug
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newBug = new Bug({ title, description });
    await newBug.save();
    res.status(201).json(newBug);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create bug' });
  }
});

// DELETE a bug
router.delete('/:id', async (req, res) => {
  try {
    await Bug.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Bug deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete bug' });
  }
});

// UPDATE bug status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(bug);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

module.exports = router;