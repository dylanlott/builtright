var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var partSchema = require('./Part').schema;
var commentSchema = require('./Comment').schema;

var buildSchema = new Schema({

  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String },
  make: { type: String },
  model: { type: String },
  trim: { type: String },
  options: { type: String },
  stage: {type: Number},
  swap: { type: String },
  date_added: { type: Date, default: Date.now },
  parts: [partSchema],
  comments: [commentSchema]

});

module.exports = mongoose.model('Build', buildSchema);
