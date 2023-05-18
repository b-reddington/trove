import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TRIPS } from '../utils/queries';
import PostCard from '../components/PostCard'


function TripsList() {
    const { loading, data } = useQuery(QUERY_TRIPS);
    const trips = data?.trips || [];
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :</p>;
  
    return (
      <div>
        <h2>PUBLIC POSTS</h2>
        {trips.map((trip) => (
          // <PostCard id={trip._id} location={trip.location} traveller={trip.traveller} createdAt={trip.createdAt} />
          <div key={trip._id}>
            <h2>{trip.location}</h2>
            <p>Season: {trip.season}</p>
            {/* Display other trip data as needed */}
          </div>
        ))}
      </div>
    );
}
  
  export default TripsList;
  