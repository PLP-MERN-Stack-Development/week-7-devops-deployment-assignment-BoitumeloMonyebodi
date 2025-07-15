const express = require("express");
const router = express.Router();
const Bug = require("../models/Bug");

// GET all bugs
router.get("/", async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching bugs" });
  }
});

// POST a new bug
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newBug = new Bug({ title, description });
    await newBug.save();
    res.status(201).json(newBug);
  } catch (err) {
    res.status(400).json({ error: "Failed to create bug" });
  }
});

module.exports = router;