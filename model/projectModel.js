

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  projectImage: { type: String, required: true },
  fileType: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Project", projectSchema);

