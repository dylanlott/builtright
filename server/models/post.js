const mongoose = require('mongoose');
const slug = require('slug');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, unique: true, required: true },
  body: { type: String, required: true },
  link: { type: String },
  group: { type: String },
  slug: { type: String, unique: true },
  tags: [{ type: String }],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, {
  timestamps: true
});

PostSchema.pre('save', function(next) {
  this.slug = slug(this.title);
  next();
});

module.exports = mongoose.model('Post', PostSchema);
