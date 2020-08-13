const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    createdTasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    assignedTasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
