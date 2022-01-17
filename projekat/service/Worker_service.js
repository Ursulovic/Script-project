const { sequelize, Worker } = require('../models')

const getAll = function (req, res) {
    Worker.findAll()
        .then(rows => {
            tableHeaders = ['Name', 'Surname', 'Age', 'Salary', 'Work time'];
            return res.json({tableHeaders , rows})})
        .catch(err => res.status(500).json(err))
}


const createNew = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Worker.create({
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            salary: req.body.salary,
            work_time: req.body.work_time
        })
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err))
    }
    else res.status(403).json('Not authorized');

}

const edit = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Worker.update(req.body, { where: { id: req.params.id } })
            .then(worker => res.json('Worker with id' + worker + ' updated successfully'))
            .catch(err => res.status(500).json(err))
    }
    else res.status(403).json('Not authorized');

}

const remove = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Worker.findOne({ where: { id: req.params.id } })
            .then(worker => {
                worker.destroy()
                    .then(rows => res.json(rows))
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



