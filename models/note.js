const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    token: { type: String, required: true } // Ensure token field is defined correctly
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
