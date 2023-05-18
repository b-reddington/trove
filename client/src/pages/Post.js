import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

import { ADD_TRIP } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { QUERY_TRIPS, QUERY_ME } from '../utils/queries';
import CloudinaryUpload from '../components/Cloudinary';

import Auth from '../utils/auth';

function Post() {
    const seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
    const [location, setLocation] = useState('');
    const [season, setSeason] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantName, setRestaurantName] = useState('');
    const [activities, setActivities] = useState([]);
    const [activityName, setActivityName] = useState('');
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        console.log(season, location, restaurants, activities, photos);
    })
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSeasonChange = (event) => {
        setSeason(event.target.value);
    };

    const handleRestaurantChange = (index, event) => {
        // const newRestaurants = [...restaurants, {name: event.target.value}];
        // setRestaurants(newRestaurants);
        setRestaurantName(event.target.value);
    };

    const handleAddRestaurant = (event) => {
        event.preventDefault();
        setRestaurants([...restaurants, {name: restaurantName}]);
        setRestaurantName('');
    };
    const handleRemoveRestaurant = (index, event) => {
        event.preventDefault();
        const newRestaurants = [...restaurants];
        newRestaurants.splice(index, 1);;
        setRestaurants(newRestaurants);
    };
    const handleActivityChange = (index, event) => {
        // const newActivities = [...activities, { name: event.target.value }];
        // setActivities(newActivities);
        setActivityName(event.target.value);
    };

    const handleAddActivity = (event) => {
        event.preventDefault();
        setActivities([...activities, {name: activityName}]);
        setActivityName('');
    };
    const handleRemoveActivity = (index, event) => {
        event.preventDefault();
        const newActivities = [...activities];
        newActivities.splice(index, 1);
        setActivities(newActivities);
    };
    const updatePhotos = (photo) => {
        setPhotos([...photos, { url: photo}])
        console.log('photos here'+photos)
    }

    const [addTrip, { error }] = useMutation(ADD_TRIP, {
        update(cache, { data: { addTrip } }) {
            try {
                const { trips } = cache.readQuery({ query: QUERY_TRIPS });

                cache.writeQuery({
                    query: QUERY_TRIPS,
                    data: { trips: [addTrip, ...trips] },
                });
            } catch (err) {
                console.error(err);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, trips: [...me.trips, addTrip] } },
            });
        },
    });



    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const newRestaurant = restaurants.filter(r => r.name !== '');
            const newActivity = activities.filter(a => a.name !== '');
            const { data } = await addTrip({
                variables: {
                    location,
                    season,
                    restaurants: newRestaurant,
                    activities: newActivity,
                    photos,
                    // traveller: Auth.getProfile().data.username,
                },
            });

            setLocation('');
            setActivities([]);
            setRestaurants([]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="text-center">Plan a Vacation</h2>
                <Form onSubmit={handleFormSubmit}>
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        placeholder="ex: Mozambique Coast"
                        value={location}
                        onChange={handleLocationChange}
                        required
                    />

                    <Form.Label>Preferred Season</Form.Label>
                    <Form.Select
                        value={season}
                        onChange={handleSeasonChange}
                        required
                    >
                        <option>Select a season</option>
                        {seasons.map((season) => (
                            <option key={season}>{season}</option>
                        ))}
                    </Form.Select>

                    {restaurants.map((restaurant, index) => (
                        <div key={index}>
                            <div className="input-box">
                            <label htmlFor={`restaurant${index}`}>Restaurant {index + 1}</label>
                            <div className='inner-input'>
                            <input
                                type="text"
                                className="form-control"
                                id={`restaurant${index}`}
                                placeholder="ex: Dhow Mozambique"
                                value={restaurantName}
                                onChange={(event) => handleRestaurantChange(index, event)}
                            />
                            <button className="btn-primary deleteBtn" onClick={(event) => handleRemoveRestaurant(index, event)}>
                                    <p>-</p>    
                            </button>
                            </div>
                            </div>
                        </div>
                    ))}
                    <button className="btn btn-primary lb" onClick={handleAddRestaurant}>
                        +
                    </button>

                    {activities.map((activity, index) => (
                        <div key={index}>
                            <label htmlFor={`activity${index}`}>Activity {index + 1}</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`activity${index}`}
                                placeholder="ex: Bazaruto Archipelago"
                                value={activityName}
                                onChange={(event) => handleActivityChange(index, event)}
                            />
                        </div>
                    ))}
                    <button className="btn btn-primary lb" onClick={handleAddActivity}>
                        +
                    </button>
                    <CloudinaryUpload 
                    updatePhotos={updatePhotos}/>
                    <button
                        className="btn btn-block pswd-btn login-btn"
                        style={{ cursor: 'pointer' }}
                        type="submit"
                    >
                        Post
                    </button>
                </Form>
            </div>
        </div>
    );
}

export default Post;
