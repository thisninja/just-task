const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Number,
    default: null
  },
  completedAt: {
    type: Number,
    default: null
  },
  _author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = { Task };
