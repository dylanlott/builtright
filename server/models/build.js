const mongoose = require('mongoose');
const slug = require('slug');

const Schema = mongoose.Schema;

const BuildSchema = new Schema({
  title: { type: String, required: true },
  info: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  _parts: [{ type: Schema.Types.ObjectId, ref: 'Part' }],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  slug: { type: String }
});

BuildSchema.pre('save', function(next) {
  this.slug = slug(this.title);
  next();
});

BuildSchema.index({ name: 'text', 'title': 'text' });

module.exports = mongoose.model('Build', BuildSchema);
