import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_TRIP } from '../utils/queries';
import { DELETE_TRIP } from '../utils/mutations';
import { ADD_LIKES } from '../utils/mutations';
import Auth from '../utils/auth'
import { Link } from 'react-router-dom'

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

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

    // for adding likes
    const [addLike, { err }] = useMutation(ADD_LIKES);

    const handleVote = async () => {
        try {
            await addLike({
                variables: { id: trip._id},
            });
        } catch (err) {
            console.error(err);
        }
    };

    // for the edit modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <h2>{trip.location}</h2>
            <button className="btn btn-primary" onClick={(event) => handleVote()}>
                <p>Like: {trip.likes}</p>    
            </button>
            <h3>Season: {trip.season}</h3>
            <h3>Traveller: <Link to={`/profiles/${trip.traveller}`}>{trip.traveller}</Link></h3>

            {console.log(trip)}


            {/* <img src={trip.photos[0].url}></img> */}
            
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

            <div>
                <h3>COMMENTS</h3>
                <div>
                    <CommentList comments={trip.comments} />
                </div>
                <div>
                    <CommentForm tripId={trip._id} />
                </div>
            </div>

            {Auth.loggedIn() && trip.traveller === Auth.getProfile().data.username ? (
                <div>
                    <button onClick={deleteTripHandler}>Delete Trip</button>
                    <Link to={`/trips/edit/${trip._id}`}>
                        <button>Edit Trip</button>
                    </Link>
                </div>
            ) : null}
        </div>
    )
}