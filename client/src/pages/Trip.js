import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_TRIP } from '../utils/queries';
import { DELETE_TRIP } from '../utils/mutations';
import Auth from '../utils/auth'
import {Link} from 'react-router-dom'

export default function Trip() {
    const { _id } = useParams();
    
    const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
        variables: { id: _id }
    });

    const trip = data?.trip || [];
    const activities = data?.trip.activities || [];
    const restaurants = data?.trip.restaurants || [];

    // for deleting trips
    const [deleteTrip, { error }] = useMutation(DELETE_TRIP);

    const deleteTripHandler = () => {
        console.log(trip);
        const { data } = deleteTrip({
            variables: {
                id: trip._id
            }
        })
        window.location.replace('/')
    }

    return (
        <div>
            <h2>{trip.location}</h2>
            <h3><Link to={`/profiles/${trip.traveller}`}>{trip.traveller}</Link></h3>

            {console.log(trip)}

            {/* {console.log(activities)}
            {console.log(restaurants)} */}

            <div>
                <h3>PLACES TO VISIT & THINGS TO DO</h3>
                <ul>
                    {activities.map((act) => (<li key={act._id}>{act.name}</li>))}
                </ul>
            </div>

            <div>
                <h3>PLACES TO EAT</h3>
                <ul>
                    {restaurants.map((r) => (<li key={r._id}>{r.name}</li>))}
                </ul>
            </div>

            {trip.traveller === Auth.getProfile().data.username ? (
                <div>
                    <button onClick={deleteTripHandler}>Delete Post</button>
                    <button>Edit Post</button>
                </div>
            ) : null}
        </div>
    )
}