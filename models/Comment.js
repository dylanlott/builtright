var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({

  body: {type: String}, 
  date: {type: Date, default: Date.now},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

});

module.exports = mongoose.model('Comment', commentSchema);
