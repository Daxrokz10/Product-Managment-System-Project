const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { db } = require('./configs/db');
const passport = require('passport');
const initializePassport = require('./middlewares/passport');


app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

initializePassport(passport);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use('/',require('./routers'));



app.listen(port,()=>{
    db;
    console.log(`Server is running on port http://localhost:${port}`);
})