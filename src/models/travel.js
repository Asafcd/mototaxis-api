const { Schema, model } = require('mongoose')

const travelSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
    },
    status: {
      type: String,
      enum: [
        "none",
        "requested",
        "accepted",
        "inProgress",
        "cancelled",
        "finished",
      ],
      default: "none",
    },
    travel_type: {
      type: String,
      enum: ["privado", "público"],
      required: true,
    },
    number_of_passengers: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    price: {
      type: Number,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    origin: {
      place: {
        type: Schema.Types.ObjectId,
        ref: "Place",
        required: true,
      },
    },
    destination: {
      place: {
        type: Schema.Types.ObjectId,
        ref: "Place",
        required: true,
      },
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model('travels', travelSchema)