const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BuildSchema = new Schema({
  title: { type: String, required: true },
  info: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments'}],
  _parts: [{ type: Schema.Types.ObjectId, ref: 'Parts' }],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Build', BuildSchema);
