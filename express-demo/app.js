const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 3000;

// register view enine
app.set('view engine', 'ejs');

// connect to mongodb
const dbURI = 'mongodb+srv://tdang4498:Dcmthangancap1@snakegame.ikyfd.mongodb.net/snakegame?retryWrites=true&w=majority'


app.use(express.static('.'));
app.use(express.urlencoded({ extended:true }));
app.use('./img',express.static(__dirname + './img'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let services = require('./services.js');
services(app);


app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(1000);
