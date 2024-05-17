const Company = require('../models/company');

const index = (req, res, next) => {
    Company.find()
    .populate('users', 'ime prezime username') 
    .then(companies => {
        res.json(companies);
    })
    .catch(error => {
        res.status(500).json({
            error: error.message
        });
    });
};

const show = (req, res, next) => {
    let companyId = req.body.companyId;
    Company.findById(companyId)
    .populate('users', 'ime prezime username') 
    .then(company => {
        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }
        res.json(company);
    })
    .catch(error => {
        res.status(500).json({
            error: error.message
        });
    });
};

const store = (req, res, next) => {
    let company = new Company({
        name: req.body.name,
        address: req.body.address
    });
    company.save()
    .then(savedCompany => {
        res.json({
            message: "Company added successfully",
            company: savedCompany
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error.message
        });
    });
};

const update = (req, res, next) => {
    let companyId = req.body.companyId;
    let updateCompany = {
        name: req.body.name,
        address: req.body.address
    };
    Company.findByIdAndUpdate(companyId, {$set: updateCompany}, {new: true})
    .then(updatedCompany => {
        res.json({
            message: "Company updated successfully",
            company: updatedCompany
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error.message
        });
    });
};

const destroy = (req, res, next) => {
    let companyId = req.body.companyId;
    Company.findByIdAndDelete(companyId)
    .then(() => {
        res.json({
            message: "Company deleted successfully"
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error.message
        });
    });
};

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
