const { Schema, model } = require('mongoose')

const userSchema = new Schema({
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

userSchema.index({ name: "text", last_name: "text" });

userSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password;
    delete ret.authStrategy;
    delete ret.refreshToken;

    return ret;
  },
});

module.exports = model("users", userSchema);