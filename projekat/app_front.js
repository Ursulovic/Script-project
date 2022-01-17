const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/frontend_routes');


const app = express();
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/admin', routes);
app.use('/admin', express.static(path.join(__dirname, 'static')));

app.listen(8002);



//app.use('/admin', express.static(path.join(__dirname, 'static')));
