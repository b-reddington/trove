import { gql } from '@apollo/client';

// Mutation to create a new user
export const ADD_USER = gql 
  `mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }`
;

// Mutation to login a user
export const LOGIN_USER = gql
  `mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }`
;

// Mutation to add a new trip
export const ADD_TRIP = gql
  `mutation addTrip($location: String!, $season: String, $restaurants: [RestaurantInput], $activities: [ActivityInput], $photos: [String]) {
    addTrip(location: $location, season: $season, restaurants: $restaurants, activities: $activities, photos: $photos) {
      _id
      location
      season
      restaurants {
        name
        cost
        description
      }
      activities {
        name
        cost
        description
      }
      photos
    }
  }`
;

// Mutation to update a trip
export const MUTATION_UPDATE_TRIP = gql
  `mutation updateTrip($tripId: ID!, $location: String, $season: String, $restaurants: [RestaurantInput], $activities: [ActivityInput], $photos: [String]) {
    updateTrip(tripId: $tripId, location: $location, season: $season, restaurants: $restaurants, activities: $activities, photos: $photos) {
      _id
      location
      season
      restaurants {
        name
        cost
        description
      }
      activities {
        name
        cost
        description
      }
      photos
    }
  }`
;

// Mutation to delete a trip
export const MUTATION_DELETE_TRIP = gql
  `mutation deleteTrip($tripId: ID!) {
    deleteTrip(tripId: $tripId) {
      _id
    }
  }`
;