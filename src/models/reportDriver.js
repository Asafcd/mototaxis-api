const { Schema, model } = require("mongoose")

const reportDriverSchema = new Schema(
  {
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    target: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    travel: {
      type: Schema.Types.ObjectId,
      ref: "Travel",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("ReportDriver", reportDriverSchema);