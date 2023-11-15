const { Schema, model } = require('mongoose');

const driverSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profile_picture: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    socket_id: {
      type: String,
      default: "",
    },
    phone_number: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    availability: {
      type: Boolean,
      default: false,
    },
    is_occupied: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    license_plate: {
      type: String,
      required: true,
      trim: true,
    },
    vehicle_color: {
      type: String,
      required: true,
      trim: true,
    },
    history: [
      {
        travel: {
          type: Schema.Types.ObjectId,
          ref: "Travel",
        },
      },
    ],
    authStrategy: {
      type: String,
      default: "jwt",
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

driverSchema.index({ name: "text", last_name: "text" });

driverSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password;
    delete ret.socket_id;
    delete ret.authStrategy;
    delete ret.refreshToken;

    return ret;
  },
});

module.exports = model('drivers', driverSchema);