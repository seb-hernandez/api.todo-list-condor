const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    title: { type: String },
    status: { type: String, default: 'open' },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    assignedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('Task', taskSchema);
