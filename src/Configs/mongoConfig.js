const MONGO_URI = "mongodb+srv://webapi:QWkcO2Vq4NbhJw9E@clusterprincipal.awhqaet.mongodb.net/Para?retryWrites=true&w=majority"
import { connect, Schema } from "mongoose";

connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error))
