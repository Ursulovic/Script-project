const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const operations = require('./routes/entity_operations');

const app = express();
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(express.json());
app.use(cors(corsOptions));




app.use('/db', operations);





app.listen(8000, async () => {
    await sequelize.authenticate();
});
