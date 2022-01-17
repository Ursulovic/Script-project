const { sequelize, Category } = require('../models');



const getAll = function (req, res) {
    Category.findAll()
        .then(rows => {
             const tableHeaders = {'Name': 'name', 'Description': 'description', 'Average weight': 'avg_weight', 'Average price': 'avg_price', 'Tax': 'tax'};

            return res.json({tableHeaders,rows})})
        .catch(err => res.status(500).json(err));
}


const createNew = function (req, res) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(req.user.type);
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {
        Category.create({
            name: req.body.name,
            description: req.body.description,
            avg_weight: req.body.avg_weight,
            avg_price: req.body.avg_price,
            tax: req.body.tax
        })
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json(err));
    }
    else res.status(403).json('Not authorized');
}

const edit = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {
        Category.update(req.body, { where: { id: req.params.id } })
            .then(rows => res.json('Category with id ' + rows + ' updated successfully'))
            .catch(err => res.status(500).json(err))
    }
    else res.status(403).json('Not authorized');
}

const remove = function (req, res) {
    if (req.user.type === 'ADMIN' || req.user.type === 'MODERATOR') {
        Category.findOne({ where: { name: req.params.id } })
            .then(category => {
                category.destroy()
                    .then(() => res.json('Category ' + req.body.name + ' deleted succesfully'))
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    }
    else res.status(403).json('Not authorized');

}




module.exports = {
    getAll,
    createNew,
    edit,
    remove

}

