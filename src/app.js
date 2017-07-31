const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

app.disable('x-powered-by');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Connection to database
const mongodbURI = 'mongodb://localhost/products';
mongoose.connect(mongodbURI);

const db = mongoose.connection;
db.on('error', (err) => {
    console.log(`Could not connect to mongodb server! ${err}`);
});
db.once('open', (res) => {
    console.log('Connected to mongodb server.');
});

// Routes
app.use(routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .render('error', {
            message: err.message
        });
});

module.exports = app;