const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    trips: [Trip]
  }

  type Trip {
    _id: ID
    location: String
    season: String
    restaurants: [Restaurant]
    activities: [Activity]
    photos: [Photo]
  }

  type Restaurant {
    _id: ID
    name: String
    cost: Int
    description: String
  }

  type Activity {
    _id: ID
    name: String
    cost: Int
    description: String
  }

  type Photo {
    _id: ID
    url: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    trips: [Trip]
    trip(_id: ID!): Trip
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTrip(location: String!, season: String, restaurants: [RestaurantInput], activities: [ActivityInput], photos: [PhotoInput]): Trip
    updateTrip(_id: ID!, location: String, season: String, restaurants: [RestaurantInput], activities: [ActivityInput], photos: [PhotoInput]): Trip
    deleteTrip(_id: ID!): Trip
  }

  input RestaurantInput {
    name: String
    cost: Int
    description: String
  }

  input ActivityInput {
    name: String
    cost: Int
    description: String
  }

  input PhotoInput {
    url: String
  }
`;

module.exports = typeDefs;
