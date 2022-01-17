const { sequelize, User } = require('../models');

const getAll = function (req, res) {
    User.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
}

const edit = function (req, res) {
    if (req.user.type === 'ADMIN') {

        User.update(req.body, { where: { id: req.params.id } })
            .then(product => 'Product with id' + product + ' updated successfully')
            .catch(err => res.status(500).json(err))
    }
    else res.status(403).json('Not authorized');

}
const remove = function (req, res) {
    if (req.user.type === 'ADMIN') {

        User.findOne({ where: { id: req.params.id } })
            .then(user => {
                user.destroy()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json(err))
            })
    }
    else res.status(403).json('Not authorized');

}


module.exports = {
    getAll,
    edit,
    remove

}



