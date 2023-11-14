const { Schema, model } = require("mongoose");

const typeServiceSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name_icon: { type: String },
    title: { type: String },
    message: { type: String },
    statusMap: { type: String }
});

const TypeService = model('TypeService', typeServiceSchema);
module.exports = TypeService