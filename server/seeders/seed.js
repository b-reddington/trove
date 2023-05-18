const db = require('../config/connection');
const { User, Trip } = require('../models');
const userSeeds = require('./userData.json');
const tripSeeds = require('./tripData.json');

db.on('error', (err) => err);

db.once('open', async () => {
    try {
        console.log('🛸🚀 connected 🚀🛸');

        await User.deleteMany({});
        await Trip.deleteMany({});

        //create user documents - USE CREATE AND NOT INSERT MANY
        // await User.create(userSeeds);
        await User.create();

        // create trip documents - USE CREATE AND NOT INSERT MANY
        await Trip.create();
        // for (let i = 0; i < tripSeeds.length; i++) {
        //     const { _id, traveller } = await Trip.create(tripSeeds[i]);
        //     const user = await User.findOneAndUpdate(
        //         { username: traveller },
        //         {
        //             $addToSet: {
        //                 trips: _id,
        //             },
        //         }
        //     );
        // }
    } catch(err) {
        console.error(err);
        process.exit(1);
    }

    console.log('🌱 seeding complete 🌱')
    process.exit(0);
})