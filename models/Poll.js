const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required!']
  },
  answers: [{
    value: String,
    votes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  }],
}, {
  timestamps: true
});

PollSchema.path('answers').schema.set('toObject', { virtuals: true });
PollSchema.path('answers').schema.set('toJSON', { virtuals: true });
PollSchema.path('answers').schema.virtual('voteCount').get(function () {
  return this.votes.length;
});

module.exports = new mongoose.model('Poll', PollSchema);