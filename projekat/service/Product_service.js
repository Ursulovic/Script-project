const { sequelize, Product } = require('../models')

const getAll = function (req, res) {
    Product.findAll()
        .then(rows => {
            tableHeaders = ['Name', 'Description', 'Price', 'Expire date'];
            return res.json({ tableHeaders , rows })})
        .catch(err => res.status(500).json(err))
}


const createNew = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Product.create({
            category_id: req.body.category_id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            expirte_date: req.body.expirte_date
        })
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err))

    }
    else res.status(403).json('Not authorized');
}

const edit = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Product.update(req.body, { where: { id: req.params.id } })
            .then(product => 'Product with id' + product + ' updated successfully')
            .catch(err => res.status(500).json(err))
    }
    else res.status(403).json('Not authorized');

}

const remove = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {

        Product.findOne({ where: { id: req.params.id } })
            .then(product => {
                product.destroy()
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



