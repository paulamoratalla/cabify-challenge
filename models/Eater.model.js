const { Schema, model } = require("mongoose")

const eaterSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

const Eater = model("Eater", eaterSchema)

module.exports = Eater




