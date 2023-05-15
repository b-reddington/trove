import { gql } from '@apollo/client';

// Query single user with their trips
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
    }
  }
`;

// Query all trips
export const QUERY_TRIPS = gql`
  query getTrips {
    trips {
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
  }
`;

// Query single trip
export const QUERY_SINGLE_TRIP = gql`
  query getSingleTrip($tripId: ID!) {
    trip(tripId: $tripId) {
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
  }
`;

// Query current user with their trips
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
    }
  }
`;
