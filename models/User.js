const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');


const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Email is required!'],
    unique: true,
  },
  /*
  userID: {
    type: String,
    minlength: 5,
    maxlength: 10,
    validate: {
      validator: function(v) {
        return /^[a-z0-9]+$/i.test(v);
      },
      message: props => `${props.value} is not a user ID!`
    },
    required: [true, 'User ID is required!']
  },
  */
  password: {
    type: String,
    required: [true, 'Password is required!']
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: 'Unit'
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'UserRole'
  },
  codeHelper: { // code koji se generise prilikom reset password, => koristimo md5(Date.now() + 'neki_secret')?
    type: String,
    default: null
  },
}, {
    timestamps: true
  });

UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(this.password, salt, null)
    this.password = hash;
    next();
  } else {
    return next();
  }
});

UserSchema.methods.comparePasswords = async function (password) {
  const isMatch = await bcryptjs.compare(password, this.password);
  return isMatch;
}

module.exports = mongoose.model('User', UserSchema);
