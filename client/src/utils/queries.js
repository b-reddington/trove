import { gql } from '@apollo/client';

// Query single user with their trips - for user profiles
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      trips {
        _id
        location
        season
        createdAt
        likes
        photos {
          url
        }
      }
    }
  }`
;

// Query all trips - for the homepage
export const QUERY_TRIPS = gql`
query getTrips {
  trips {
    _id
    location
    season
    traveller
    restaurant {
      name
    }
    activities {
      name
    }
    createdAt
    photos {
      url
    }
  }
}`;

// Query single trip - for the trip page
export const QUERY_SINGLE_TRIP = gql`
query getSingleTrip($tripId: ID!) {
  trip(_id: $id) {
    _id
    traveller
    location
    season
    createdAt
    likes
    restaurants {
      name
    }
    activities {
      name
    }
    photos {
      url
    }
    comments {
      commenter
      commentText
      createdAt
    }
  }
}`
;

// Query current user with their trips - for my profile
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      trips {
        _id
        location
        season
        createdAt
        likes
        photos {
          url
        }
      }
    }
  }`
;
