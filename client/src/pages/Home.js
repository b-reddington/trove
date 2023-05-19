import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TRIPS } from '../utils/queries';
import PostCard from '../components/PostCard'


function TripsList() {
    const { loading, data } = useQuery(QUERY_TRIPS);
    const trips = data?.trips || [];
  
    return (
      <div>
        <h2>EXPLORE TRIPS</h2>

        <div className="d-flex flex-wrap gap-3">
          {
            trips.map((trip) => (<PostCard key={trip._id} tripId={trip._id} location={trip.location} traveller={trip.traveller} createdAt={trip.createdAt} />))
          }
        </div>
      </div>
    );
}
  
  export default TripsList;
  