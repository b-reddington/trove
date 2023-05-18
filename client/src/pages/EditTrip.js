import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import CloudinaryUpload from '../components/Cloudinary';

//get trip info by querying
import { QUERY_SINGLE_TRIP, QUERY_TRIPS, QUERY_ME } from '../utils/queries';
import { UPDATE_TRIP } from '../utils/mutations';


export default function EditTrip() {
    const { _id } = useParams();

    //get info from a trip
    const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
        variables: { id: _id }
    });

    const trip = data?.trip || [];
    const act = data?.trip.activities || [];
    const rest = data?.trip.restaurants || [];
    const pic = data?.trip.photos || [];

    //form function stuff
    const seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
    const [location, setLocation] = useState('');
    const [season, setSeason] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantName, setRestaurantName] = useState('');
    const [activities, setActivities] = useState([]);
    const [activityName, setActivityName] = useState('');
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        setLocation(trip.location);
        setSeason(trip.season);
        setRestaurants(rest);
        setActivities(act);
        setPhotos(pic)

        console.log(season, location, restaurants, activities, photos);
    }, []);

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
        setActivities([...act, ...activities, {name: activityName}]);
        setActivityName('');
    };

    const handleRemoveActivity = (index, event) => {
        event.preventDefault();
        const newActivities = [...activities];
        newActivities.splice(index, 1);
        setActivities(newActivities);
    };

    const [updateTrip, { error }] = useMutation(UPDATE_TRIP, {
        update(cache, { data: { updateTrip } }) {
            try {
                const { trips } = cache.readQuery({ query: QUERY_TRIPS });

                cache.writeQuery({
                    query: QUERY_TRIPS,
                    data: { trips: [updateTrip, ...trips] },
                });
            } catch (err) {
                console.error(err);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, trips: [...me.trips, updateTrip] } },
            });
        },
    });

    const updatePhotos = (photo) => {
        setPhotos([...photos, { url: photo}])
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const newRestaurant = restaurants.filter(r => r.name !== '');
            const newActivity = activities.filter(a => a.name !== '');
            const { data } = await updateTrip({
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
            window.location.replace(`/trips/${trip._id}`)
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <h2>Edit your trip</h2>

            {console.log(restaurants)}
            {console.log(activities)}
            {console.log(pic)}
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

            <Form.Label>Season</Form.Label>
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

            <h3>Restaurants</h3>

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
                + Add Restaurant
            </button>

            <h3>Activities</h3>

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
                + Add Activity
            </button>

            <h3>Photos</h3>

            <CloudinaryUpload 
            updatePhotos={updatePhotos}/>
            <button
                className="btn btn-block pswd-btn login-btn"
                style={{ cursor: 'pointer' }}
                type="submit"
            >
                Edit Trip
            </button>
        </Form>
    )
}