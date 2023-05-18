const { Schema, model } = require('mongoose');
const restaurantSchema = require('./Restaurants');
const activitySchema = require('./Activities');
const photoSchema = require('./Photos');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat')

const tripSchema = new Schema(
    {
        traveller: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
            trimmed: true
        },
        season: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            default: 0
        },
        restaurants: [restaurantSchema],
        activities: [activitySchema],
        photos: [photoSchema],
        comments: [commentSchema],
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);

const Trip = model('trip', tripSchema);

module.exports = Trip;