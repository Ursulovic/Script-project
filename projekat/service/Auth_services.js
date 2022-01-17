const { sequelize, User } = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = function (req, res) {

    const user = {
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        type: 'USER'
    }

    User.create(user)
        .then(rows => {

            usr = {
                name: rows.name,
                email: rows.name,
                id: rows.id
            }

            const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

            res.json({ token: token })

        })
        .catch(err => res.status(422).json(err));
}

const login = function (req, res) {

    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (bcrypt.compareSync(req.body.password, user.password)) {


                const obj = {
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    type: user.type
                }


                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials" });
            }



        })
        .catch(err => res.status(500).json(err));

}



module.exports = {
    register,
    login
}