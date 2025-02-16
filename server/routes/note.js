import express from "express";
import Note from "../models/Note.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.post("/add", middleware, async (req, res) => {
  try {
    const { title, description } = req.body || {};

    const newNote = new Note({
      title,
      description,
      userId: req.user.id,
    });

    await newNote.save();
    
    return res
      .status(200)
      .json({ success: true, message: "Note added sucessfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in adding note" });
  }
});

router.get("/", middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    return res
      .status(200)
      .json({ success: true, notes, message: "Notes fetched successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in fetching notes" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateNote = await Note.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ success: true, updateNote });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update note" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await Note.findByIdAndDelete(id, req.body);
    return res.status(200).json({ success: true, deleteNote });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete note" });
  }
});

export default router;
