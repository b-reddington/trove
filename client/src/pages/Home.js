import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TRIPS } from '../utils/queries';
import PostCard from '../components/PostCard'


function TripsList() {
    const { loading, data } = useQuery(QUERY_TRIPS);
    const trips = data?.trips || [];
  
    return (
      <div>
        <h2>PUBLIC POSTS</h2>

        <div className="d-flex flex-wrap justify-content-around gap-1">
          {
            trips.map((trip) => (<PostCard key={trip._id} tripId={trip._id} location={trip.location} traveller={trip.traveller} createdAt={trip.createdAt} />))
          }
        </div>
      </div>
    );
}
  
  export default TripsList;
  