const { Schema, model } = require('mongoose');

const photoSchema = new Schema(
    {
        url: {
            type: String
        }
    },
    {
        id: false,
    }
)

module.exports = photoSchema;