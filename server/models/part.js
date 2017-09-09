const mongoose = require('mongoose');
const slug = require('slug');

const Schema = mongoose.Schema;

const PartSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  make: { type: String },
  model: { type: String },
  price: { type: Number },
  trim: { type: Schema.Types.Mixed },
  url: { type: String, required: true },
  source: { type: String },
  notes: { type: String },
  options: [{ type: String }],
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

PartSchema.pre('save', function (next) {
  this.slug = slug(this.title);
  next();
});

module.exports = mongoose.model('Part', PartSchema);
