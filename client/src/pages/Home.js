import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TRIPS } from '../gql/queries';

function TripsList() {
    const { loading, error, data } = useQuery(QUERY_TRIPS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
  
    return (
      <div>
        {data.trips.map((trip) => (
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
  