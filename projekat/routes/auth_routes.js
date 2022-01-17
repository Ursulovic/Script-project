const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const authService = require('../service/Auth_services');

const SchemaValidator = require('../middlewares/schema_validator');
const validateRequest = SchemaValidator(true);

route.post('/register', validateRequest, authService.register)

route.post('/login', validateRequest, authService.login)


module.exports = route;