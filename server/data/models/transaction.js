const mongoose = require('mongoose');
const moment = require('moment');

module.exports.Transaction = mongoose.model('Transaction', {
  ftReferenceNo: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    trim: true
  },
  data: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  raw: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  createdAt: {
    type: Number,
    default: moment.valueOf()
  },
  completed: {
    type: Boolean, 
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  bank: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  _creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },
  statusCode: {
    type: String,
    minlength: 1,
    trim: true,
    default: 'U'
  },
  remarks: {
    type: String,
    trim: true,
    default: 'Uploaded'
  },
});