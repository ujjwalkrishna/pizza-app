require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDBStore = require('connect-mongo')(session); // It will store our session id in database.

//Database Connection
const url = 'mongodb://localhost:27017/pizza';
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('Database connected..');
}).catch(err =>{
    console.log('Connection failed..');
})

//Session Store
let mongoStore = new MongoDBStore({
                      mongooseConnection: connection,
                      collection: 'sessions'
              });

//Session Config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24}  // 24 hours
}))

app.use(flash());

//Assets
app.use(express.static('public'));
app.use(express.json());

//Global Middleware to use session in client side
app.use((req, res, next)=>{
    res.locals.session = req.session;
    next();
})

//Set Template Engine
app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

require('./routes/web.js')(app);

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Listening on port 3000');
})