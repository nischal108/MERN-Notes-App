const express = require("express");
const userValidation = require("../middlewares/userValidation");
const Note = require("../models/notes.model");

const router = express.Router();

router.get("/getNotes", userValidation, async (req, res) => {
  const userId = req.userId;

  try {
    const notes = await Note.find({ userId });
    res.status(200).json({
      notes,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
});

router.post("/addNote", userValidation, async (req, res) => {
  const userId = req.userId;
  const { title, content, tags } = req.body;

  try {
    await Note.create({
      title,
      content,
      tags,
      userId,
    });
    res.status(201).json({
      message: "Note created successfully",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
});

router.put("/editNote/:id", userValidation, async (req, res) => {
  const noteId = req.params.id;
  const updates = req.body;

  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
        error: true,
      });
    }

    Object.keys(updates).forEach((key) => {
      note[key] = updates[key];
    });

    await note.save();

    res.status(200).json({
      message: "Note updated successfully",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
});

router.put("/updatePin/:id", userValidation, async (req, res) => {
  const id = req.params.id;

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
        error: true,
      });
    }
    note.isPinned = !note.isPinned;
    await note.save();

    res.status(200).json({
      message: "Pin status updated successfully",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
});

router.delete("/deleteNote/:id", userValidation, async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Note.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: "Note not found",
        error: true,
      });
    }
    res.status(200).json({
      message: "Note deleted successfully",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
});

router.get("/searchNotes/:query", userValidation, async (req, res) => {
  const query = req.params.query;

  try {
    const searchedNotes = await Note.find({
      $or: [
        { title: new RegExp(query, "i") },
        { content: new RegExp(query, "i") },
      ],
    });
    res.status(200).json({
      message: "Search successful",
      notes: searchedNotes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
});

router.get("/getNote/:id", userValidation, async (req, res) => {
  const id = req.params.id;

  try {
    const note = await Note.findOne({ _id: id });
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
        error: true,
      });
    }
    res.status(200).json({
      note,
      message: "Note loaded successfully",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
});

module.exports = router;
