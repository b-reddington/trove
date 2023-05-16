import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import { GeoAltFill } from 'react-bootstrap-icons';

export default function PostCard({ location, traveller, createdAt }) {
    return (
        <Card className="postcard">
            <GeoAltFill color="#2A6F97" className="geoicon"/>
            <h3 className="location">{location}</h3>
            <p className="created-by">Created by {traveller}</p>
            <p className="created-on">on {createdAt}</p>
        </Card>
    )
}