const { validationResult } = require('express-validator');
const Note = require('../models/note');

// Add a new note
const addNote = async (req, res) => {
  // Validate request body
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));
  let newNote = req.body;

  // Append user and company_id to newNote from userData in request
  newNote = {
    ...newNote,
    user: req.userData.id,
    company_id: req.userData.company_id,
  };

  // Create a new Note model instance
  const newNoteM = new Note({
    ...newNote
  });

  // Save the new note to the database
  await newNoteM.save();
  res.send(newNoteM);
};

// Edit an existing note by ID
const editNote = async (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));

  // Extract note ID from URL parameters
  const id = req.params.title;

  // Update the note in the database and return the updated note
  const note_update = await Note.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  // Check if note_update is null (note with given ID not found)
  if (!note_update) {
    return res.send('There is no such note');
  }

  res.send(note_update);
};

// Delete a note by ID
const deleteNote = async (req, res) => {
  const id = req.params.title;

  // Delete the note from the database
  const note_delete = await Note.findByIdAndDelete(id);

  // Check if note_delete is null (note with given ID not found)
  if (!note_delete) {
    res.send('Your note does not exist!');
  }

  res.send({ 'Note deleted successfully.': note_delete });
};

// Get a note by ID
const getNote = async (req, res) => {
  const id = req.params.title;

  // Find the note in the database by ID
  const note = await Note.findById(id);

  // Check if note is null (note with given ID not found)
  if (!note) {
    res.send('Note does not exist.');
  }

  res.send(note);
};

// Get all notes for a specific user
const getAllNotes = async (req, res) => {
  const id_usera = req.userData._id;

  // Find all notes belonging to the user
  const notes_usera = await Note.find({ user: id_usera });

  // Check if user has no notes
  if (notes_usera.length < 1) {
    return res.send('You do not have notes.');
  }

  res.send(notes_usera);
};

// Get all notes for a specific company
const getAllNotesCompany = async (req, res) => {
  const company_id = req.userData.company_id;

  // Find all notes belonging to the company and populate user details
  const notes_company = await Note
    .find({ company_id: company_id })
    .populate('user');

  // Check if company has no notes
  if (notes_company.length < 1) {
    return res.send('Your company has no notes.');
  }

  res.send(notes_company);
};

module.exports = {
  addNote,
  editNote,
  deleteNote,
  getNote,
  getAllNotes,
  getAllNotesCompany,
};
