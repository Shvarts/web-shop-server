import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import mongoose from 'mongoose';

const app = express();
app.disable('x-powered-by');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connection to database
const mongoURI = 'mongodb://localhost/products';
mongoose.connect(mongoURI);

const db = mongoose.connection;
db
    .on('error', (err) => {
        console.log(`Could not connect to mongo server! ${err}`);
    })
    .once('open', (res) => {
        console.log('Connected to mongo server.');
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

export default app;