const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const Company = require('../models/company');
const Note = require('../models/note');

mongoose.connect('mongodb://localhost:27017/walterdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const companiesData = [
    { name: 'Company One', address: '123 Street, City' },
    { name: 'Company Two', address: '456 Avenue, City' }
];

const usersData = [
    { ime: 'John', prezime: 'Doe', username: 'johndoe', sifra: 'password123', companyName: 'Company One' },
    { ime: 'Jane', prezime: 'Doe', username: 'janedoe', sifra: 'password123', companyName: 'Company Two' }
];

const notesData = [
    { title: 'First Note', content: 'This is the first note', username: 'johndoe', companyName: 'Company One' },
    { title: 'Second Note', content: 'This is the second note', username: 'janedoe', companyName: 'Company Two' }
];

async function populateDatabase() {
    try {
        // Add companies
        for (const companyData of companiesData) {
            // Generate token for company
            const companyToken = jwt.sign({ name: companyData.name }, process.env.JWT_SECRET);

            const newCompany = new Company({
                name: companyData.name,
                address: companyData.address,
                token: companyToken
            });

            await newCompany.save();
            console.log(`Company added: ${newCompany.name}`);
        }

        // Add users
        for (const userData of usersData) {
            const company = await Company.findOne({ name: userData.companyName });
            const hashedPassword = await bcrypt.hash(userData.sifra, 10);

            // Generate token for user
            const userToken = jwt.sign({ username: userData.username, company: company._id }, process.env.JWT_SECRET);

            const newUser = new User({
                ime: userData.ime,
                prezime: userData.prezime,
                username: userData.username,
                sifra: hashedPassword,
                company: company._id,
                token: userToken
            });
            await newUser.save();
            console.log(`User added: ${newUser.username}`);
        }

        // Add notes
        for (const noteData of notesData) {
            const user = await User.findOne({ username: noteData.username });
            const company = await Company.findOne({ name: noteData.companyName });

            // Generate token for note
            const noteToken = jwt.sign({ title: noteData.title, content: noteData.content, user: user._id, company: company._id }, process.env.JWT_SECRET);

            const newNote = new Note({
                title: noteData.title,
                content: noteData.content,
                user: user._id,
                company_id: company._id,
                token: noteToken
            });
            await newNote.save();
            console.log(`Note added: ${newNote.title}`);
        }

        console.log('Database populated successfully.');

    } catch (error) {
        console.error('Error populating database:', error);
    } finally {
        mongoose.connection.close();
    }
}

populateDatabase();
