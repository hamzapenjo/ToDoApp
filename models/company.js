const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    token: { type: String, required: true } // Ensure token field is defined correctly
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
