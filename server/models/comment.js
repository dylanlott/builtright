const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
const CommentsSchema = new Schema({
  text: { type: String, required: true },
  _parent: { type: String },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _votes: [{ type: Schema.Types.ObjectId, ref: 'User'  }],
  rating: { type: Number },
  hidden: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', CommentsSchema);
