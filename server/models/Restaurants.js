const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trimmed: true
        }
    },
    {
        id: false,
    }
)

module.exports = restaurantSchema;