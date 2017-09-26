const mongoose = require('mongoose');
const slug = require('slug');
const constants = require('../constants');
const Float = require('mongoose-float').loadType(mongoose, 2);

const TYPES = constants.PART_TYPES;
const Schema = mongoose.Schema;

const PartSchema = new Schema({
  title: { type: String, unique: true, required: true },
  description: { type: String },
  slug: { type: String, unique: true },
  make: { type: String },
  model: { type: String },
  type: { type: String, enum: TYPES },
  price: { type: Float },
  trim: { type: Schema.Types.Mixed },
  url: { type: String, required: true },
  source: { type: String },
  notes: { type: String },
  options: [{ type: String }],
  _comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

PartSchema.pre('save', function (next) {
  this.slug = slug(this.title);
  next();
});

module.exports = mongoose.model('Part', PartSchema);
