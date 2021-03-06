const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  content: {
    type: Object,
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  accessible: [
    {
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
      },
    },
  ],
});

module.exports = mongoose.model('Submission', SubmissionSchema);
