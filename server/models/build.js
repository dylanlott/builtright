const mongoose = require('mongoose');
const slug = require('slug');
const searchable = require('mongoose-searchable');
const constants = require('../constants');

const Schema = mongoose.Schema;

const BuildSchema = new Schema({
  title: { type: String, unique: true, required: true },
  info: { type: String },
  tags: [{ type: String }],
  display: { type: String, default: constants.BUILD_DEFUALT_IMAGE },
  vehicle: {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    trim: { type: String },
    options: { type: String },
    transmission: { type: String },
    color: { type: String }
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
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
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

BuildSchema.pre('save', function (next) {
  this.slug = slug(this.title);
  next();
});

module.exports = mongoose.model('Build', BuildSchema);
