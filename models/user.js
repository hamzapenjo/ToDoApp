const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    ime: { type: String, required: true },
    prezime: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    sifra: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    token: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
