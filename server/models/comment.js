const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  text: { type: String, required: true },
  _source: { type: String },
  _parent: { type: String },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  _downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  hidden: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', CommentsSchema);
