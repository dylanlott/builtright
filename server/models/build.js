const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const slug = require('slug');
const searchable = require('mongoose-searchable');
const constants = require('../constants');
const Schema = mongoose.Schema;
const log = require('../logger');

const BuildSchema = new Schema({
  title: { type: String, unique: true, required: true, es_indexed: true },
  info: { type: String, es_indexed: true },
  tags: [{ type: String, es_indexed: true }],
  keywords: [{
    type: String,
    es_indexed: true
  }],
  display: { type: String, default: constants.BUILD_DEFUALT_IMAGE },
  vehicle: {
    make: { type: String, required: true, es_indexed: true },
    model: { type: String, required: true, es_indexed: true },
    year: { type: String, required: true, es_indexed: true },
    trim: { type: String, es_indexed: true },
    options: { type: String, es_indexed: true },
    transmission: { type: String, es_indexed: true },
    color: { type: String, es_indexed: true }
  },
  stats: {
    wheel_horsepower: { type: Number },
    crank_horsepower: { type: Number },
    torque: { type: Number },
    zerotosixty: {type: Number },
    topSpeed: { type: Number }
  },
  _comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  _parts: [{ type: Schema.Types.ObjectId, ref: 'Part' }],
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  slug: { type: String, unique: true },
  reddit: { type: String }, // corresponding reddit link,
  imgur: { type: String }, // imgur album link
  _upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  _downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  hidden: { type: Boolean, default: false }
}, {
  timestamps: true
});

BuildSchema.plugin(searchable);
BuildSchema.plugin(mongoosastic, {
  host: process.env.ELASTICSEARCH_HOST,
  port: process.env.ELASTICSEARCH_PORT,
  curlDebug: process.env.NODE_ENV === 'production' ? false : true
});

BuildSchema.pre('save', function (next) {
  this.slug = slug(this.title, { lowercase: true });
  next();
});

module.exports = mongoose.model('Build', BuildSchema);
