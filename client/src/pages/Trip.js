import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_TRIP } from '../utils/queries';
import { DELETE_TRIP } from '../utils/mutations';
import { ADD_LIKES } from '../utils/mutations';
import Auth from '../utils/auth'
import {Link} from 'react-router-dom'
import Carousel from '../components/Carousel/Carousel';

export default function Trip() {
    const { _id } = useParams();
    
    const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
        variables: { id: _id }
    });

    const trip = data?.trip || [];
    const activities = data?.trip.activities || [];
    const restaurants = data?.trip.restaurants || [];
    const images = data?.trip.photos || [];
    

    //Carousel
    
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
    const imageUrls = photos.map((photo) => photo.url);
    return (
        <div>
            <h2>{trip.location}</h2>
            <button className="btn btn-primary" onClick={(event) => handleVote()}>
                                    <p>Like: {trip.likes}</p>    
                            </button>
            <h3><Link to={`/profiles/${trip.traveller}`}>{trip.traveller}</Link></h3>

            {console.log(trip)}

            <div>
             <h1>React Carousel</h1>
            <Carousel images={images} />
            </div>
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

            {trip.traveller === Auth.getProfile().data.username ? (
                <div>
                    <button onClick={deleteTripHandler}>Delete Post</button>
                    <button>Edit Post</button>
                </div>
            ) : null}
        </div>
    )
}