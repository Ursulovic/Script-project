const express = require('express');
const { sequelize, User } = require('./models');
const cors = require('cors');
const routes = require('./routes/auth_routes');

const app = express();
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(express.json());
app.use(cors(corsOptions));

app.use('/auth', routes);


app.listen({ port: 8001 }, async () => {
    await sequelize.authenticate();
});