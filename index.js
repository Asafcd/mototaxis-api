const express = require("express");
const exhbs = require('express-handlebars')
const path = require("path");
const morgan = require('morgan')
const firebase = require('./firebase')

const app = express();
app.use( (req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,auth-token');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
} )
app.set("port", process.env.PORT || 80);
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/v1/driver', require("./src/Routes/index"))
app.use('/api/v1/location', require("./src/Routes/locationRoute"))

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")} - Bienvenidos Mototaxis `);
  //console.log(path.join(__dirname, 'views/index.html'));
});