import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_TRIP } from '../utils/queries';
import { DELETE_TRIP, ADD_LIKES, DELETE_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth'
import {Link} from 'react-router-dom'
import Carousel from '../components/Carousel/Carousel';
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
    const images = data?.trip.photos || [];
    console.log(images);

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
        // deleting comments
        const [deleteComment, { e }] = useMutation(DELETE_COMMENT);

        const handleDeleteComment = async (event) => {
            event.preventDefault();
            try {
                await deleteComment({
                    variables: {
                        tripId: trip._id,
                        commentId: event.target.id
                    }
                })
            } catch (err) {
                console.log(err);
            }
    
            console.log(event.target.id)
            console.log(trip._id)
    
        }
    return (
        <div className='p-3' >
            <h2>{trip.location}</h2>
            <button className="btn btn-primary" onClick={(event) => handleVote()}>
                                    <p>Like: {trip.likes}</p>    
                            </button>
            <h3><Link to={`/profiles/${trip.traveller}`}>{trip.traveller}</Link></h3>

            {console.log(trip)}

            <div>
            <Carousel images={images} />
            </div>
            {/* <img src={trip.photos[0].url}></img> */}
            
            {/* {console.log(activities)}
            {console.log(restaurants)} */}

            <div className='mt-4'>
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
                    <CommentList comments={trip.comments} commentDeleter={handleDeleteComment} />
                </div>
                <div>
                    <CommentForm tripId={trip._id} />
                </div>
            </div>
            {trip.traveller === Auth.getProfile().data.username ? (
                <div>
                    <button className="btn btn-danger mt-5" onClick={deleteTripHandler}>Delete Post</button>
                    {/* <button>Edit Post</button> */}
                </div>
            ) : null}
            
        </div>
    )
}