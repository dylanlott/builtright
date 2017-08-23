const mongoose = require('mongoose');
const slug = require('slug');
const searchable = require('mongoose-searchable');

const Schema = mongoose.Schema;

const BuildSchema = new Schema({
  title: { type: String, required: true },
  info: { type: String },
  _comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  _parts: [{ type: Schema.Types.ObjectId, ref: 'Part' }],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  slug: { type: String }
});

BuildSchema.plugin(searchable);

BuildSchema.pre('save', function (next) {
  this.slug = slug(this.title);
  next();
});

module.exports = mongoose.model('Build', BuildSchema);
