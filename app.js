const express = require('express');
const mongoose = require('mongoose');
const router = require("./routes/AuthRoutes")
const cookiesParser = require('cookie-parser')
const app = express();
const jwt = require('jsonwebtoken')
// Json body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies using qs library
// middleware
app.use(cookiesParser()) // PARSING COOKIES AND ALL
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');


// AUTH MIDDLEWARE
const requiredAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    // verify token
    jwt.verify(token, 'This is a secret', (err, decodedToken) => {
      if (err) {
        res.redirect('/login');
      }
      else {
        console.log(decodedToken)
        next()
      }
    })
  }
  else {
    res.redirect('/login')
  }
}


// database connection
const dbURI = 'mongodb+srv://jimpam:jimpam@cluster0.tz7ha.mongodb.net/NodeJSAuth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000, () => { console.log("Connected to mongoose and listening on port 3000") }))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requiredAuth, (req, res) => res.render('smoothies'));

app.get('/image', (req, res) => {
  res.render('smoothie.png');
})
// using router from AuthRoutes
app.use(router);

