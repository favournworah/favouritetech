const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  brandimage: {
    filename: {
      type: String,
      unique: true,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    imageBase64: {
      type: String,
      required: true,
    },
  },
  brandname: {
    type: String,
    trim: true,
  },
});
UploadeModel = mongoose.model("graphicsUpload", uploadSchema);

module.exports = UploadeModel;
