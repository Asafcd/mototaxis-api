const express = require("express");
const exhbs = require('express-handlebars')
const path = require("path");
const morgan = require('morgan')
const session = require('express-session')
const MySqlStore = require('express-mysql-session')
const passport = require('passport')

const app = express();
app.use( (req,res,next) =>{
  // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,auth-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
} )
app.set("port", process.env.PORT || 80);
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/v1/driver', require("./src/Routes/index"))
app.use('/api/v1/trip', require("./src/Routes/tripRoute"))

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")} - Bienvenidos Mototaxis `);
  //console.log(path.join(__dirname, 'views/index.html'));
});