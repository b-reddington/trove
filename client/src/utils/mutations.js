import { gql } from '@apollo/client';

// create a new user
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// login a user
export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// create a new trip
export const ADD_TRIP = gql`
 mutation Mutation($location: String!, $season: String!, $restaurants: [RestaurantInput], $activities: [ActivityInput], $photos: [PhotoInput]) {
  addTrip(location: $location, season: $season, restaurants: $restaurants, activities: $activities, photos: $photos) {
    location
  }
}`;


// update a trip
export const UPDATE_TRIP = gql`
mutation updateTrip($tripId: ID!, $location: String, $season: String, $restaurants: [RestaurantInput], $activities: [ActivityInput], $photos: [String]) {
    updateTrip(_id: $id, location: $location, season: $season, restaurants: $restaurants, activities: $activities, photos: $photos) {
        _id
        traveller
        location
        season
        createdAt
        likes
        activities {
            name
        }
        restaurants {
            name
        }
        photos {
            url
        }
        comments {
            _id
            commentText
        }
    }
}
`;

// delete a trip
export const DELETE_TRIP = gql`
    mutation deleteTrip($id: ID!) {
        deleteTrip(_id: $id) {
        _id
        }
    }
`;

// add likes
export const ADD_LIKES = gql`
    mutation addLikes($id: ID!) {
        addLikes(_id: $id) {
        _id
        location
        likes
        }
    }
`;

// add a comment
export const ADD_COMMENT = gql`
    mutation addComment($tripId: ID!, $commentText: String!) {
        addComment(tripId: $tripId, commentText: $commentText) {
        _id
        location
        comments {
            _id
            commenter
            commentText
            createdAt
        }
        }
    }
`;

// delete a comment
export const DELETE_COMMENT = gql`
    mutation deleteComment($tripId: ID!, $commentId: ID!) {
        deleteComment(tripId: $tripId, commentId: $commentId) {
        _id
        location
        comments {
            _id
            commenter
            commentText
            createdAt
        }
        }
    }
`;