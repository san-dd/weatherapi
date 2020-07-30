const mongoose = require('mongoose');

// Audit Schema
const AuditSchema = mongoose.Schema({
  appkey:{
    type: String,
    required: true
  },
  api:{
    type: String,
    required: true
  },
  ip:{
    type: String
  },
  isPrimeDate:{
      type:Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Audit = module.exports = mongoose.model('Audit', AuditSchema);