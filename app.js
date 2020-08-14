require('dotenv-flow').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./db');
const isAuth = require('./middleware/isAuth');
const apiRoutes = require('./routes');
const app = express();

// connect DB
connectDB();

// port
app.set('PORT', process.env.PORT || 5000);

// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// config
app.use(express.json({ extended: false }));
app.use(morgan('dev'));

// middlewares
app.use(isAuth);

// routes
app.use('/api', apiRoutes);

// error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
