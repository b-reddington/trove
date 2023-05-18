const { User, Trip } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Get all trips, populate with restaurants and activities
    trips: async () => {
      return Trip.find().sort({ createdAt: -1 }).populate('restaurants activities photos');
    },

    // Get a single trip by ID, populate with restaurants and activities
    trip: async (parent, { _id }) => {
      return Trip.findOne({ _id }).populate('restaurants activities photos comments');
    },

    // Get a single user by username, populate with their trips
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('trips');
    },

    // Get the logged in user's data, populate with their trips
    me: async (parent, args, context) => {
      // If a user is authenticated, return the user's data populated with their trips
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('trips');
      }
      // If no user is authenticated, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  
  Mutation: {
    // Register a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      // Sign a token for the new user
      const token = signToken(user);
      // Return the new user's data and token
      return { token, user };
    },

    // Log in a user
    login: async (parent, { email, password }) => {
      // Find a user by the provided email
      const user = await User.findOne({ email });
      
      // If no user is found, throw an error
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      
      // If a user is found, check the provided password against the hashed password in the database
      const correctPw = await user.isCorrectPassword(password);
      
      // If the passwords don't match, throw an error
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      // // Alternate CodeBlock ->:  If the passwords match, create a JWT for the user
      // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      // // Return the JWT
      // return { token };
      // <-- ALternate CodeBlock: If the passwords match, sign a token for the user
      const token = signToken(user);
      // Return the user's data and token
      return { token, user };
    },

    // Add a new trip
    addTrip: async (parent, { location, season, restaurants, activities, photos }, context) => {
      // If a user is authenticated, add a new trip
      if (context.user) {
        const trip = await Trip.create({ traveller: context.user.username, location, season, restaurants, activities, photos });
        // Add the trip to the authenticated user's list of trips
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { trips: trip._id } }
        );
        // Return the new trip's data
        return trip;
      }
      // If no user is authenticated, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },

    // Update a trip
    updateTrip: async (parent, { _id, location, season, restaurants, activities, photos }) => {
      // Find a trip by ID and update it with the provided data
      return Trip.findOneAndUpdate(
        { _id },
        { location, season, restaurants, activities, photos },
        { new: true }
        );
      },

    // Delete a trip
    deleteTrip: async (parent, { _id }, context) => {
      // If a user is authenticated, delete the trip
      if (context.user) {
        // Find a trip by ID and delete it
        const trip = await Trip.findByIdAndDelete({ _id });
        // Remove the trip from the authenticated user's list of trips
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { trips: trip._id } }
        );
        // Return the deleted trip's data
        return trip;
      }
      // If no user is authenticated, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },

    // Add likes
    addLikes: async (parent, { _id }, context) => {
      if (context.user) {
        const like = await Trip.findOneAndUpdate(
          { _id },
          { $inc: { likes: 1 } },
          { new: true }
        );

        return like;
      }
    },

    // Add a comment
    addComment: async (parent, { tripId, commentText }, context) => {
      if (context.user) {
        return Trip.findOneAndUpdate(
          { _id: tripId },
          {
            $addToSet: {
              comments: { commenter: context.user.username, commentText },
            },
          },
          {
            new: true,
            runValidators: true
          }
        )
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // Delete a comment
    deleteComment: async (parent, { tripId, commentId }, context) => {
      if (context.user) {
        return Trip.findOneAndUpdate(
          { _id: tripId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commenter: context.user.username,
              },
            },
          },
          { new: true }
        )
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
