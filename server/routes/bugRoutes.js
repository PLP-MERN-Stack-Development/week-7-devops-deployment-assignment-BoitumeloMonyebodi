const express = require('express');
const router = express.Router();
const Bug = require('../models/Bug');

// @route   GET /api/bugs
// @desc    Get all bugs
router.get('/', async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/bugs
// @desc    Create a new bug
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newBug = new Bug({ title, description });
    const savedBug = await newBug.save();
    res.status(201).json(savedBug);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/bugs/:id
// @desc    Get a bug by ID
router.get('/:id', async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    res.json(bug);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/bugs/:id
// @desc    Update a bug by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBug) return res.status(404).json({ error: 'Bug not found' });
    res.json(updatedBug);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/bugs/:id
// @desc    Delete a bug by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBug = await Bug.findByIdAndDelete(req.params.id);
    if (!deletedBug) return res.status(404).json({ error: 'Bug not found' });
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;