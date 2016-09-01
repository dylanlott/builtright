var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./Comment.js');

var partSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  url: { type: String, required: true },
  price: { type: Number, required: true },
  power: { type: Number }
});

module.exports = mongoose.model('Part', partSchema);
