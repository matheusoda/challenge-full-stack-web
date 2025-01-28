const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const sequelize = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});
