const { sequelize, Driver } = require('../models')

const getAll = function (req, res) {
    Driver.findAll()
        .then(rows => {
            tableHeaders = ['Name', 'Surname', 'Age', 'Salary', 'Role'];

            return res.json({tableHeaders, rows})})
        .catch(err => res.status(500).json(err));
}


const createNew = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Driver.create({
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            salary: req.body.salary,
            role: req.body.salary
        })
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err))
    }
    else res.status(403).json('Not authorized');
}

const edit = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Driver.update(req.body, { where: { id: req.params.id } })
            .then(driver => 'Driver with id' + driver + ' update successfuly')
            .catch(err => res.status(500).json(err))
    }
    else res.status(403).json('Not authorized');
}

const remove = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Driver.findOne({ where: req.params.id })
            .then(driver => {
                driver.destroy()
                    .then(res.json('Driver ' + driver.name + ' ' + driver.surname + ' deleted succesfully'))
                    .catch(err => res.status(500).json(err))
            })
    }
    else res.status(403).json('Not authorized');

}



module.exports = {
    getAll,
    createNew,
    edit,
    remove

}



