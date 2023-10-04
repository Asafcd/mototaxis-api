const express = require("express");
const morgan = require('morgan')


const app = express();
app.use( (req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,auth-token');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
} )
app.set("port", process.env.PORT || 100);
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())





app.use('/api/v1/driver', require("./src/Routes/driverRoute"))
app.use('/api/v1/trip', require("./src/Routes/tripRoute"))
app.use('/api/v1/button', require("./src/Routes/buttonRoute"))
app.use('/api/v1/client', require("./src/Routes/clientRoute"))
app.use('/api/v1/auth', require("./src/Routes/authRoute"));
app.use('/api/v1/fee', require("./src/Routes/feeRoute"));


app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")} - Bienvenidos Backeros `);
});