const mongoose = require('mongoose');

const PLANS = ["Trial", "Subscribed"];

const ProfileSchema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  services: [
    {
      type: String,
    }
  ],
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    default: 'none',
  },
  avatar: {
    type: String,
  },
  domain: {
    type: String
  },
  plan: {
    type: String,
    enum: PLANS,
    default: 'Trial'
  },
  created_at: {
    type: Date,
    default: new Date()
  }
};

module.exports = mongoose.model('Profile', ProfileSchema);
