import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap/Card'

export default function Post({ location, traveller, createdAt }) {
    return (
        <Card className="card">
            <span class="material-icons-round">place</span>
            <h3>{location}</h3>
            <div>Dream vacation</div>
            <p>Created by {traveller} on {createdAt}</p>
        </Card>
    )
}