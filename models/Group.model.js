const { Schema, model } = require("mongoose")

const groupSchema = new Schema(
    {
        eaters: [{
            type: String
        }],
        leader: {
            type: String
        },
        restaurant: {
            type: String
        },
        week: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const Group = model("Group", groupSchema)

module.exports = Group;


