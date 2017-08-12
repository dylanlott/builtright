const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const PartSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  trim: { type: Schema.Types.Mixed },
  options: [{ type: String }],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  updated: { type: Date }
});

module.exports = mongoose.model('Part', PartSchema);
