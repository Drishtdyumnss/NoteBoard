const express = require('express');
const {
  GetNotes,
  GetNoteById,
  CreateNote,
  UpdateNote,
  DeleteNote,
} = require('../controllers/noteController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', protect, GetNotes);

router.post('/create', protect, CreateNote);

router
  .route('/:id')
  .get(GetNoteById)
  .delete(protect, DeleteNote)
  .put(protect, UpdateNote);

module.exports = router;
