var express = require('express');
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var contactRoutes = require('./src/routes/crmRoute');
var securityRoutes = require('./src/routes/securityRoute');
var productRoutes = require('./src/routes/productRoute');
var config = require('./config');
var tokenService = require('./tokenService');
var Database = require('./database');

const app = express();
const PORT = 3000;

//database initialization
const database = new Database();
database.initModels().then(() => {
    app.set('db', database);
});

//body-parser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//use morgan to log requests to console
app.use(morgan('dev'));

//routing
securityRoutes(app);

//token verification middleware
app.use(tokenService.verifyToken);

//routing
contactRoutes(app);
productRoutes(app);

//serving static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`Node and express server is running on port: ${PORT}`);
});

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
