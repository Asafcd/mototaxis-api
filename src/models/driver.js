const { Schema, model } = require('mongoose');

const driverSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    profile_picture: {
        url: { type: String },
        public_id: { type: String }
    },
    socket_id: { type: String },
    phone_number: { type: Number },
    adress: { type: String },
    verified: { type: Boolean },
    availavility: { type: Boolean },
    is_occupied: { type: Boolean },
    rating: { type: Number },
    license_plate: { type: String },
    vehicle_color: { type: String },
    authStrategy: { type: String },
    refreshToken: { type: String },
    history: { type: Array },
    createAt: { type: Date },
    updatedAt: { type: Date }
});

const driverModel = model('Driver', driverSchema);
module.exports = driverModel