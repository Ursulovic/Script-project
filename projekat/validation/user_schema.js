const Joi = require('joi');


const register_schema = Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required()
})


const login_schema = Joi.object().keys({
    email : Joi.string().email().required(),
    password: Joi.string().required()
})

const editUser_schema = Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    type: Joi.string().valid('USER', 'MODERATOR', 'ADMIN').required()
})


module.exports = {
    '/register' : register_schema,
    '/login' : login_schema,
    '/edit' : editUser_schema
}