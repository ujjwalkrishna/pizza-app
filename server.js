const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('home');
})
app.get('/cart', (req, res)=>{
    res.render('customers/cart');
})
app.get('/login', (req, res)=>{
    res.render('auth/login');
})
app.get('/register', (req, res)=>{
    res.render('auth/register');
})






app.listen(process.env.PORT || 3000, ()=>{
    console.log('Listening on port ${PORT}');
})