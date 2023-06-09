require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const userRoute = require('./routes/userService');
const refreshTokenRoute = require('./routes/refreshTokens');
const medicalRoute = require('./routes/medicalService')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/user', userRoute);
app.use('/refresh-token', refreshTokenRoute);
app.use('/medical-record', medicalRoute);

module.exports = app;
