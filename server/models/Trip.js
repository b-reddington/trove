const { Schema, model } = require('mongoose');
const restaurantSchema = require('./Restaurants');
const activitySchema = require('./Activities');
const photoSchema = require('./Photos');

const tripSchema = new Schema(
    {
        location: {
            type: String,
            required: true,
            trimmed: true
        },
        season: {
            type: String,
            required: true
        },
        restaurants: [restaurantSchema],
        activities: [activitySchema],
        photos: [photoSchema]
    },
    {
        id: false
    }
);

const Trip = model('trip', tripSchema);

module.exports = Trip;