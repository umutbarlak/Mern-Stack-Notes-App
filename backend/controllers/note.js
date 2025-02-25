const Note = require("../models/note.js");
const mongoose = require("mongoose");

const getAllNotes = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json({
    notes,
  });
};

const createNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    const note = await Note.create({ title, description });
    res.status(200).json({
      message: "Note eklendi",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "İd geçersiz",
    });
  }
  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({
      message: "Not bulunamadı",
    });
  }

  res.status(200).json({
    note,
  });
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "İd geçersiz",
    });
  }
  const note = await Note.findByIdAndDelete(id);

  if (!note) {
    return res.status(404).json({
      message: "Not bulunamadı",
    });
  }

  res.status(200).json({
    message: "Not başarı ile silindi",
  });
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "İd geçersiz",
    });
  }

  const note = await Note.findByIdAndUpdate(id, req.body, { new: true });

  if (!note) {
    return res.status(404).json({
      message: "Not bulunamadı",
    });
  }

  res.json({
    message: "İd'li not güncellemdi",
    note,
  });
};

module.exports = {
  createNote,
  getAllNotes,
  getNote,
  deleteNote,
  updateNote,
};
