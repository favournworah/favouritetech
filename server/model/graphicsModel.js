const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

//initialize slug
mongoose.plugin(slug);

const graphicsUploadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
  },
  timeCreated: {
    type: Date,
    default: () => Date.now(),
  },
  img: {
    type: String,
    default: "placeholder.jpg",
  },
  slug: {
    type: String,
    slug: "title",
    unique: true,
    slug_padding_size: 4,
  },
});
const AddGraphics = mongoose.model("Graphics", graphicsUploadSchema);

module.exports = AddGraphics;
