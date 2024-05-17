const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
