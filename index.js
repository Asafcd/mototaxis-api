const express = require("express");
const morgan = require('morgan')


const app = express();
app.set("port", process.env.PORT || 80);
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use( (req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,auth-token');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
} )

const MONGO_URI = "mongodb+srv://webapi:QWkcO2Vq4NbhJw9E@clusterprincipal.awhqaet.mongodb.net/Para?retryWrites=true&w=majority"
const { connect } = require("mongoose");

connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error))

app.use('/api/v1/driver', require("./src/Routes/driverRoute"))
app.use('/api/v1/trip', require("./src/Routes/tripRoute"))
app.use('/api/v1/client', require("./src/Routes/clientRoute"))
app.use('/api/v1/place', require("./src/Routes/placeRoute"));
app.use('/api/v1/travelType', require("./src/Routes/travelTypeRoute"))
app.use('/api/v1/reportDriver', require("./src/Routes/reportDriverRoute"))
app.use('/api/v1/reportUser', require("./src/Routes/reportUserRoute"))
//app.use('/api/v1/auth', require("./src/Routes/authRoute"));


app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")} - Bienvenidos Backeros `);
});
app.get('/', (req, res) => res.send('Hello World!'))