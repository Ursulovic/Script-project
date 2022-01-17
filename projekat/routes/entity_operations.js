const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const SchemaValidator = require('../middlewares/schema_validator');
const validateRequest = SchemaValidator(true);

const auth = require('../middlewares/auth');

route.use(auth);



const categoryService = require('../service/Category_service');
const driverService = require('../service/Driver_service');
const productService = require('../service/Product_service');
const workerService = require('../service/Worker_service');

//category

route.get('/categories', categoryService.getAll)
route.post('/categories',validateRequest , categoryService.createNew)
route.put('/categories/:id', validateRequest , categoryService.edit)
route.delete('/categories/:id', categoryService.remove);

// Drivers

route.get('/drivers', driverService.getAll)
route.post('/drivers', validateRequest , driverService.createNew)
route.put('/drivers/:id', validateRequest , driverService.edit)
route.delete('/drivers/:id', driverService.remove)

//Product

route.get('/products', productService.getAll)
route.post('/products', validateRequest , productService.createNew)
route.put('/productss/:id', validateRequest , productService.edit)
route.delete('/products/:id', productService.remove)

//Workers

route.get('/workers', workerService.getAll);
route.post('/workers', validateRequest , workerService.createNew);
route.put('/workers/:id', validateRequest , workerService.edit)
route.delete('/workers/:id', workerService.remove);






module.exports = route;