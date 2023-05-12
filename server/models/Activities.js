const { Schema, model } = require('mongoose');

const activitySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trimmed: true
        }
    },
    {
        id: false
    }
)

module.exports = activitySchema