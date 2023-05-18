// Importing necessary packages and files
import React from 'react';
import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_ME, QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth'
import PostCard from '../components/PostCard'

// Creating a functional component called 'Profile'
export default function Profile() {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  })

  const user = data?.me || data?.user || {};

  const trips = user.trips || [];

  // goes to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />
  }

  if (!user?.username) {
    return (
      <h4>Please log in or sign up!</h4>
    )
  }

  return (
    <div>
      <h2>See {user.username}'s trips</h2>
      <h4>Total trips: {trips.length}</h4>
      {console.log(user)}
      {/* {console.log(trips)} */}


      <div className="d-flex flex-wrap justify-content-around gap-1">
        {
          trips.map((trip) => (<PostCard key={trip._id} tripId={trip._id} location={trip.location} traveller={trip.traveller} createdAt={trip.createdAt} />))
        }
      </div>

      {console.log(user)}
    </div>
  )
};
