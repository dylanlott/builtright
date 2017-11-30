const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const slug = require('slug');
const constants = require('../constants');
const Float = require('mongoose-float').loadType(mongoose, 2);

const TYPES = constants.PART_TYPES;
const Schema = mongoose.Schema;

const PartSchema = new Schema({
  title: { type: String, unique: true, required: true, es_indexed: true },
  description: { type: String, es_indexed: true },
  slug: { type: String, unique: true },
  make: { type: String, es_indexed: true },
  model: { type: String, es_indexed: true },
  type: { type: String, enum: TYPES },
  price: { type: Float },
  trim: { type: Schema.Types.Mixed, es_indexed: true },
  data: { type: Schema.Types.Mixed, es_indexed: true },
  url: { type: String, required: true },
  source: { type: String },
  notes: { type: String },
  options: [{ type: String }],
  _comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  _downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

PartSchema.pre('save', function (next) {
  this.slug = slug(this.title);
  next();
});

PartSchema.plugin(mongoosastic, {
  host: process.env.ELASTICSEARCH_HOST,
  port: process.env.ELASTICSEARCH_PORT
});

module.exports = mongoose.model('Part', PartSchema);
