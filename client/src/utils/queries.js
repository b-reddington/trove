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
        traveller
        season
        likes
        createdAt
        activities {
          _id
          name
        }
        restaurants {
          _id
          name
        }
        photos {
          _id
          url
        }
        comments {
          _id
          commentText
          commenter
          createdAt
        }
      }
    }
  }
`;

// Query all trips - for the homepage
export const QUERY_TRIPS = gql`
query getTrips {
  trips {
    _id
    location
    traveller
    season
    likes
    createdAt
    activities {
      _id
      name
    }
    restaurants {
      _id
      name
    }
    photos {
      _id
      url
    }
    comments {
      _id
      commentText
      commenter
      createdAt
    }
  }
}`;

// Query single trip - for the trip page
export const QUERY_SINGLE_TRIP = gql`
query getSingleTrip($id: ID!) {
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
