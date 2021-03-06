const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const ROLES = ['admin', 'user']

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    unique: true,
    lowercase: true,
    required: 'Email is required',
  },
  password: {
    type: String,
    min: [6, 'Password is too short, min is 6 characters'],
    required: 'Password is required',
  },
  confirmToken: String,
  firstLogin: {
    type: Boolean,
    default: true
  },
  lastLogin_at: {
    type: Date,
    default: null
  },
  stripe: {
    stripeCustomerId: {
      type: String
    },
    stripeSubscriptionId: {
      type: String
    }
  },
  role: {
    type: String,
    enum: ROLES,
    default: 'user'
  },
});

UserSchema.methods.hasSamePassword = function (requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
};

UserSchema.methods.hasSameConfirmToken = function (confirmToken) {
    return (confirmToken === this.confirmToken);
};

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (err) {
      console.log(err);
      next();
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
