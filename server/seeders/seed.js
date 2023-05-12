const db = require('../config/connection');
const { User, Trip } = require('../models');
const userSeeds = require('./userData.json');
const tripSeeds = require('./tripData.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    try {
        console.log('🛸🚀 connected 🚀🛸');

        await User.deleteMany({});
        await Trip.deleteMany({});

        //create user documents - USE CREATE AND NOT INSERT MANY
        await User.create(userSeeds);

        // create trip documents - USE CREATE AND NOT INSERT MANY
        for (let i = 0; i < tripSeeds.length; i++) {
            const { _id, traveller } = await Trip.create(tripSeeds[i]);
            const user = await User.findOneAndUpdate(
                { username: traveller },
                {
                    $addToSet: {
                        trips: _id,
                    },
                }
            );
        }
    } catch(err) {
        console.error(err);
        process.exit(1);
    }

    console.log('🌱 seeding complete 🌱')
    process.exit(0);
})