const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Başlık zorunlu olarak girilmelidir"],
    },
    description: {
      type: String,
      required: [true, "Açıklama zorunlu olarak girilmelidir"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
