const express = require("express");
const {
  createNote,
  getAllNotes,
  getNote,
  deleteNote,
  updateNote,
} = require("../controllers/note");

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNote);

router.post("/", createNote);

router.delete("/:id", deleteNote);

router.patch("/:id", updateNote);

module.exports = router;
