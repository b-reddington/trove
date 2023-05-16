import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TRIPS } from '../utils/queries';


function TripsList() {
    const { loading, data } = useQuery(QUERY_TRIPS);
  const trips = data?.trips || [];
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :</p>;
  
    return (
      <div>
        {trips.map((trip) => (
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
  