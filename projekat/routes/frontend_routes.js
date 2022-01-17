const express = require('express');

const route = express.Router();
route.use(express.urlencoded({ extended: true }));



route.get('/auth', function(req, res) {
    res.sendFile('auth.html', {root: './static'});
})

route.get('/categories', function(req, res) {
    res.sendFile('Category_panel.html', {root: './static'});
})




module.exports = route;