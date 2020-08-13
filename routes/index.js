const express = require('express');
const userRoutes = require('./user');
const taskRoutes = require('./task');
const app = express();

app.use('/user', userRoutes);
app.use('/task', taskRoutes);

module.exports = app;
