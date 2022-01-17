const Joi = require('joi');

const category_schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    avg_weight: Joi.number().min(0).required(),
    avg_price: Joi.number().min(0).required(),
    tax: Joi.number().min(0).required()
})

const driver_schema = Joi.object().keys({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    age: Joi.number().integer().min(18).max(50).required(),
    salary: Joi.number().integer().min(100).max(1000).required(),
    role: Joi.string().uppercase().valid('STAFF_DRIVER', 'MEETING_DRIVER').required(),
})

const product_schema = Joi.object().keys({
    category_id: Joi.number().integer().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().integer().min(0).required(),
    expirte_date: Joi.number().min(Math.floor(new Date().getTime() / 1000))
})



const worker_schema = Joi.object().keys({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    age: Joi.number().integer().min(18).max(65).required(),
    salary: Joi.number().integer().min(100).max(1500).required(),
    work_time: Joi.number().integer().min(4).max(10).required(),
})



module.exports= {
    '/categories': category_schema,
    '/drivers': driver_schema,
    '/products': product_schema,
    '/workers':  worker_schema
}
