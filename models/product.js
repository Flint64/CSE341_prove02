const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stuffSchema = new Schema({
  tags: {
    type: Array,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Collection', stuffSchema);