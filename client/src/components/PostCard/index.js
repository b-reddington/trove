import React from 'react';
import Card from 'react-bootstrap/Card'
import { GeoAltFill } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom'

export default function PostCard({ key, tripId, location, traveller, createdAt }) {
    return (
        <Link className="trip-link" to={`/trips/${tripId}`}>
            <Card className="postcard" key={key}>
                <GeoAltFill color="#2A6F97" className="geoicon"/>
                <h3 className="location">{location}</h3>
                <p className="created-by">Created by {traveller}</p>
                <p className="created-on">on {createdAt}</p>
            </Card>
        </Link>
    )
}