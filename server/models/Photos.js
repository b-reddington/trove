const { Schema, model } = require('mongoose');

const photoSchema = new Schema(
    {
        name: {
            type: String
        }
    },
    {
        id: false,
    }
)

module.exports = photoSchema;