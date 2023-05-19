import React, { useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_TRIP } from '../utils/queries';
import { DELETE_TRIP, ADD_LIKES, DELETE_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth'
import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel/Carousel';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { Col, Row, Container, Card } from 'react-bootstrap/';

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
                variables: { id: trip._id },
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

    const commentContainerRef = useRef(null);

    useEffect(() => {
        if (commentContainerRef.current) {
            commentContainerRef.current.scrollTop = commentContainerRef.current.scrollHeight;
        }
    }, [trip.comments]);

    return (
        <div className='p-3' >
            <Row className="m-auto centered mb-5">
                <Col>
                    <h2>{trip.location}</h2>
                </Col>
                <Col>
                    <h3 className="centered author"><Link to={`/profiles/${trip.traveller}`}> Created by {trip.traveller}</Link></h3>
                </Col>
                <Col>
                    <button className="btn likeBtn" onClick={(event) => handleVote()}>
                        <p>Like: {trip.likes}</p>
                    </button>
                </Col>
            </Row>

            <div>
                <Carousel images={images} />
            </div>
            <Row>
                <Col>
                    <Container className='postContainer'>
                        <div className='mt-4'>
                            <h3>PLACES TO VISIT & THINGS TO DO</h3>
                            <ul>
                                {activities.map((act) => (<li key={act._id}>{act.name}</li>))}
                            </ul>
                        </div>
                    </Container>
                </Col>
                <Col>
                    <Container className='postContainer'>
                        <div>
                            <h3>PLACES TO EAT</h3>
                            <ul>
                                {restaurants.map((r) => (<li key={r._id}>{r.name}</li>))}
                            </ul>
                        </div>
                    </Container>
                </Col>
            </Row>
            <Card className='commentCard'>
                <Card.Header>
                <h3>COMMENTS</h3>
                </Card.Header>
                <div className="commentContainer" ref={commentContainerRef}>
                    <Card.Body>
                        <div className="comments">
                            <CommentList comments={trip.comments} 
                            commentDeleter={handleDeleteComment} />
                        </div>
                    </Card.Body>
                </div>
                <Card.Footer>
                    <div className='commentInput'>
                        <CommentForm tripId={trip._id} />
                    </div>
                </Card.Footer>
                
            </Card>
            {trip.traveller === Auth.getProfile().data.username ? (
                <div className="centered">
                    <button className="btn btn-danger" onClick={deleteTripHandler}>Delete Post</button>
                    {/* <button>Edit Post</button> */}
                </div>
            ) : null}
        </div>


    )
}