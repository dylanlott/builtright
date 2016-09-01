var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var partSchema = require('./Part').schema;
var Part = require('./Part');
var commentSchema = require('./Comment').schema;
var buildSchema = new Schema({

  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String },
  make: { type: String },
  model: { type: String },
  trim: { type: String },
  color: { type: String },
  options: { type: String },
  swap: { type: String },
  date_added: { type: Date, default: Date.now },
  mileage: { type: Number },
  parts: [partSchema],
  comments: [commentSchema],
  notes: { type: String },
  active: { type: Boolean, default: true }

});

buildSchema.pre('save', function(next) {
    var build = this;
    build.parts.forEach(function(part) {
        var body = {
            "name": part.name,
            "url": part.url,
            "price": part.price
        }
        var newPart = new Part(body);
        newPart.owner = build.owner;
        newPart.save(function(err, data) {
            if (err) {
                console.error("Error saving part from build: ", err)
            } else {
                console.log("Part(s) saved: ", data);
            }
        });
    });
    return next();
});

module.exports = mongoose.model('Build', buildSchema);
