require('dotenv-flow').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./db');
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
// app.use(isAuth);

module.exports = app;
