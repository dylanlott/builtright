const mongoose = require('mongoose');
const slug = require('slug');
//const assert = require('assert');
//const errors = require('storj-service-error-types');
const mongoosastic = require('mongoosastic');

const Schema = mongoose.Schema;

const StepSchema = new Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
  warnings: { type: String }
})

const PostSchema = new Schema({
  title: { type: String, unique: true, required: true, es_indexed: true },
  body: { type: String, required: true, es_indexed: true },
  link: { type: String },
  group: { type: String },
  category: { type: String },
  build: { type: Schema.Types.ObjectId, ref: 'Build' },
  type: { type: String, enum: ["blog", "forum", "guide"]},
  steps: [{ type: Schema.Types.Mixed }],
  slug: { type: String, unique: true },
  tags: [{ type: String, es_indexed: true }],
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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

PostSchema.plugin(mongoosastic, {
  host: process.env.ELASTICSEARCH_HOST,
  port: process.env.ELASTICSEARCH_PORT,
  curlDebug: process.env.NODE_ENV === 'production' ? false : true
});

module.exports = mongoose.model('Post', PostSchema);
