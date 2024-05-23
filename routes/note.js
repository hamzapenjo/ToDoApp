const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const authMiddleware = require('../middleware/authMiddleware');
const authzMiddleware = require('../middleware/authzMiddleware');
const userController = require('../controllers/userController');

// POST /api/note/add-note - Create a new note
router.post('/add-note', authMiddleware.authenticateUser, notesController.addNote);

// PUT /api/note/edit-note/:title - Edit an existing note
router.put('/edit-note/:title', authMiddleware.authenticateUser, notesController.editNote);

// DELETE /api/note/delete-note/:title - Delete an existing note
router.delete('/delete-note/:title', authMiddleware.authenticateUser, notesController.deleteNote);

// GET /api/note/get-note/:title - Get a specific note by title
router.get('/get-note/:title', authMiddleware.authenticateUser, notesController.getNote);

// GET /api/note/get-all-notes - Get all notes
router.get('/get-all-notes', authMiddleware.authenticateUser, notesController.getAllNotes);

// GET /api/note/get-all-notes-company - Get all notes for a specific company
router.get('/get-all-notes-company', authMiddleware.authenticateUser, notesController.getAllNotesCompany);

// GET /api/note/ - Get all users (admin only)
router.get('/', authMiddleware.authenticateUser, authzMiddleware.authorizeUser(['admin']), userController.index);

module.exports = router;
