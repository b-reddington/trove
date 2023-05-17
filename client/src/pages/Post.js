import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

import CloudinaryUpload from '../components/Cloudinary';
let seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];

function Post() {
    const [restaurants, setRestaurants] = useState(['']); // Initial state with one restaurant
    const [activities, setActivities] = useState(['']); // Initial state with one activity

    const handleRestaurantChange = (index, event) => {
        const newRestaurants = [...restaurants];
        newRestaurants[index] = event.target.value;
        setRestaurants(newRestaurants);
    };

    const handleAddRestaurant = (event) => {
        event.preventDefault();
        setRestaurants([...restaurants, '']); // Add a new empty restaurant
    };
    const handleRemoveRestaurant = (index, event) => {
        event.preventDefault();
        const newRestaurants = [...restaurants];
        newRestaurants.splice(index, 1);;
        setRestaurants(newRestaurants);
    };
    const handleActivityChange = (index, event) => {
        const newActivities = [...activities];
        newActivities[index] = event.target.value;
        setActivities(newActivities);
    };

    const handleAddActivity = (event) => {
        event.preventDefault();
        setActivities([...activities, '']); // Add a new empty activity
    };
    const handleRemoveActivity = (index, event) => {
        event.preventDefault();
        const newActivities = [...activities];
        newActivities.splice(index, 1);
        setActivities(newActivities);
    };
    

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="text-center">Plan a Vacation</h2>
                <Form>
                    <label htmlFor="location">Location</label>
                    <input type="text" className="form-control" id="location" placeholder="ex: Mozambique Coast" required />
                    <Form.Label>Preferred Season</Form.Label>
                    <Form.Select required>
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
                                value={restaurant}
                                onChange={(event) => handleRestaurantChange(index, event)}
                            />
                            <button className="btn-primary deleteBtn" onClick={(event) => handleRemoveRestaurant(index, event)}>
                                    <p>-</p>    
                            </button>
                            </div>
                            </div>
                        </div>
                    ))}
                    <button className="btn btn-primary lb button" onClick={handleAddRestaurant}>+</button>

                    {activities.map((activity, index) => (
                        <div key={index}>
                            <div className="input-box">
                                <label htmlFor={`activity${index}`}>Activity {index + 1}</label>
                                <div className='inner-input'>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`activity${index}`}
                                        placeholder="ex: Bazaruto Archipelago"
                                        value={activity}
                                        onChange={(event) => handleActivityChange(index, event)}
                                    />
                                    <button className="btn-primary deleteBtn" onClick={(event) => handleRemoveActivity(index, event)}>
                                    <p>-</p>  
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="btn btn-primary lb button" onClick={handleAddActivity}>+</button>
                    <>

                        <CloudinaryUpload />
                    </>
                    <button className="btn btn-block pswd-btn login-btn button" style={{ cursor: 'pointer' }} type="submit">
                        Post
                    </button>
                </Form>
            </div>
        </div>
    );
}

export default Post;
