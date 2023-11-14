/* _id
6546a8b32dc6c0a9b63892cc
user
6542c0419321455b716ebfb1
driver
null
status
"requested"
travel_type
"público"
number_of_passengers
2
paid
false

origin
Object
place
6546a8b32dc6c0a9b63892c8

destination
Object
place
6546a8b32dc6c0a9b63892ca
date
2023-11-04T20:25:23.524+00:00 */

const { Schema, model } = require('mongoose')

//travel_type must change to travel_type_id
const TravelSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    driver: { type: Schema.Types.ObjectId, ref: 'drivers' },
    status: { type: String, required: true },
    travel_type: { type: String, required: true },
    number_of_passengers: { type: Number, required: true },
    paid: { type: Boolean, required: true },
    origin: {
        place: { type: Schema.Types.ObjectId, ref: 'places' },
    },
    destination: {
        place: { type: Schema.Types.ObjectId, ref: 'places' },
    },
    date: { type: Date, default: Date.now },
})

const travelSchema = model('travels', TravelSchema)
module.exports = travelSchema