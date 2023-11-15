/* _id
6546a8b32dc6c0a9b63892c8
place_id
"ChIJk7W9GUd3Vo8Rt8N4tOU2n28"
title
"Superfarmacias Guadalajara, Calle 7, Santa Rita Cholul, Mérida, Yucata…"

structured_formatting
Object
main_text
"Superfarmacias Guadalajara"
secondary_text
"Calle 7, Santa Rita Cholul, Mérida, Yucatan, Mexico"
latitude
21.0280497
longitude
-89.5708748
type
"origin" */

const { Schema, model } = require('mongoose')

const placeSchema = new Schema(
  {
    place_id: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    structured_formatting: {
      main_text: {
        type: String,
        required: true,
        trim: true,
      },
      secondary_text: {
        type: String,
        required: true,
        trim: true,
      },
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["origin", "destination"],
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model("places", placeSchema);
