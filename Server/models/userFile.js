const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userFileSchema = new Schema({
  email: String,
  fileinfo: {
    path:{
      type: String,
      required: [true, 'File path is a required value']
    },
    mimetype : String,
    filename: String,
    originalname: String,
    encoding: String
  },
  processed: {
    type: String,
    default: "uploaded",
    enum: [
      "uploaded",
      "processed",
      "deleted"
    ]
  },
  output: {
    table: {
      headers: [String],
      values: [Array]
    },
    classification: {
      type: String,
      enum: [
        'deviation',
        'well header',
        'cuttings',
        'core analysis',
        'fifth category'
      ]
    }
  }
});

const UserFile = mongoose.model('userfile', userFileSchema);

module.exports = UserFile;
