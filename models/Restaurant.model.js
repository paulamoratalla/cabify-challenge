const { Schema, model } = require("mongoose")

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        address: {
            type: String,
            required: [true, "Address is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Restaurant = model("Restaurant", restaurantSchema)

module.exports = Restaurant