// server/models/bugModel.js

const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Solved'],
      default: 'Open',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bug', bugSchema);
