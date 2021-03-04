const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = Schema(
  {
    title: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [
      {
        type: new mongoose.Schema({
          comment: { type: String },
          enteredBy: { type: Schema.Types.ObjectId, ref: 'User' },
        }),
      },
      { timestamps: true },
    ],
  },
  { timestamps: true },
);

const Log = mongoose.model('Logs', logSchema);

module.exports = Log;
