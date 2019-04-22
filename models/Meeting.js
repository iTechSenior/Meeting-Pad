const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  attendants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  document: {
    type: Schema.Types.ObjectId,
    ref: 'Document'
  }
}, {
  timestamps: true
});

MeetingSchema.pre('save', async function (next) {
  if(this.attendants.length === 0 || !this.document) {
    return next('You should pick one document and at least one attendant for meeting!');
  } else {
    next();
  }
});

module.exports = mongoose.model('Meeting', MeetingSchema);