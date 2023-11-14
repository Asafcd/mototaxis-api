const { Schema, model } = require("mongoose");

const TravelTypeSchema = new Schema({
    _id: { type: Number },
    name_icon: { type: String },
    title: { type: String },
    message: { type: String },
    statusMap: { type: String }
});

const typeService = model('typeservices', TravelTypeSchema);
module.exports = typeService