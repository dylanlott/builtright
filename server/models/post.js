const mongoose = require('mongoose');
const slug = require('slug');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, unique: true, required: true },
  body: { type: String, required: true },
  link: { type: String },
  group: { type: String },
  category: { type: String },
  vehicle: {
    year: { type: Number },
    make: { type: String },
    model: { type: String },
    trim: { type: String },
    options: { type: String },
    build: { type: Schema.Types.ObjectId, ref: 'Build' }
  },
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
  next();
});

module.exports = mongoose.model('Post', PostSchema);
