const Note = require('../models/noteModel');
const asyncHandler = require('express-async-handler');

const GetNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const CreateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ Error: 'Please fill all the fields' });
    // throw new Error('Please fill all the fields');
  } else {
    const note = new Note({ user: req.user._id, title, content, category });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

const GetNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    return res.json(note);
  } else {
    return res.status(404).json({ Error: 'Note not found' });
  }
});

const UpdateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ mesage: 'Note not found' });
  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ Error: "You can't perform this action" });
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    return res.status(404).json({ Error: 'Note not found' });
    // throw new Error('Note not found');
  }
});

const DeleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) return res.status(404).json({ mesage: 'Note not found' });

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401).json({ Error: "You can't perform this action" });
    // throw new Error("You can't perform this action");
  }
  await note.remove();
  res.json({ Error: 'Note Removed' });
});

module.exports = { GetNotes, GetNoteById, CreateNote, UpdateNote, DeleteNote };
