const mongoose = require('mongoose');
const slug = require('slug');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  link: { type: String },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  slug: { type: String },
  tags: [{ type: String }]
});

PostSchema.pre('save', function(next) {
  this.slug = slug(this.title);
  next();
});

module.exports = mongoose.model('Post', PostSchema);
