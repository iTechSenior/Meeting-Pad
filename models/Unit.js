const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const UnitSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Unit name is missing!'],
    enum: ['Business', 'Integrated Technology', 'Wholesale', 'Finance', 'HR'],
    unique: true
  }
}, {
  timestamps: true
});

UnitSchema.plugin(uniqueValidator, {
  message: ({ path, value }) => {
      if (path == 'name') return 'UserRole already exists.'
  }
});

UnitSchema.post('save', async function (err, doc, next) { 
  const error = [];
  if (err.name == 'ValidationError') {
      for (const a in err.errors) error.push(err.errors[a].message)
      return next(error)
  }
  else return next(err)
});

module.exports = mongoose.model('Unit', UnitSchema);