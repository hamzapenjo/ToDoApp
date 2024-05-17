// user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    username: {
        type: String
    },
    sifra: {
        type: String
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
