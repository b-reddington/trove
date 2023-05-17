// Importing necessary packages and files
import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

// Creating a functional component called 'Profile'
function Profile() {
  // Using the useQuery hook from Apollo Client to fetch data
  // QUERY_ME query retrieves data for the logged-in user
  // loading is a boolean indicating if the request is in progress
  // error will contain any error messages if an error occurred
  // data is the response from the server
  const { loading, error, data } = useQuery(QUERY_ME);

  // If the request is still in progress, display a loading message
  if (loading) return <p>Loading...</p>;
  // If there was an error with the request, display an error message
  if (error) return <p>Error: {error.message}</p>;

  // Once the data has loaded, render the user's trips
  return (
    <div>
      <h2>My Trips</h2>
      {/* Iterate over each trip the user has */}
      {data.me.trips.map((Trip) => (
        <div key={Trip._id}>
          {/* Display the location of the trip */}
          <h3>{Trip.location}</h3>
          {/* Display the season of the trip */}
          <p>Season: {Trip.season}</p>
          {/* Display the number of likes the trip has */}
          <p>Likes: {Trip.likes}</p>
          {/* Display the date and time when the trip was created */}
          <p>Created at: {Trip.createdAt}</p>
          {/* Iterate over each photo in the trip's photos array */}
          {trip.photos.map((photo, index) => (
          // Display an image element for each photo, using the photo's URL as the source
         <img key={index} src={photo.url} alt="trip" />
))}

          {/* Add more data to display as needed */}
        </div>
      ))}
    </div>
  );
}

// Export the Profile component so it can be imported and used in other files
export default Profile;
