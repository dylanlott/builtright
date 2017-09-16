const mongoose = require('mongoose');
const slug = require('slug');
const searchable = require('mongoose-searchable');

const Schema = mongoose.Schema;

const BuildSchema = new Schema({
  title: { type: String, unique: true, required: true },
  info: { type: String },
  _comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  _parts: [{ type: Schema.Types.ObjectId, ref: 'Part' }],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  slug: { type: String, unique: true },
  reddit: { type: String }, // corresponding reddit link,
  imgur: { type: String }, // imgur album link
  _votes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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
