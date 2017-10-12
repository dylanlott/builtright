const mongoose = require('mongoose');
const slug = require('slug');
//const assert = require('assert');
//const errors = require('storj-service-error-types');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, unique: true, required: true },
  body: { type: String, required: true },
  link: { type: String },
  group: { type: String },
  category: { type: String },
  build: { type: Schema.Types.ObjectId, ref: 'Build' },
  type: { type: String, enum: ["blog", "forum", "guide"]},
  steps: [{ type: Schema.Types.Mixed }],
  slug: { type: String, unique: true },
  tags: [{ type: String }],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  _upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  _downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

PostSchema.pre('save', function (next) {
  this.slug = slug(this.title);
  //if (this.type === 'guide') {
  //  assert(this.steps.length > 1, errors.BadRequest('Guides must have at least two steps.')
  //}
  next();
});

module.exports = mongoose.model('Post', PostSchema);
