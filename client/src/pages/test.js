import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_TRIP } from '../utils/queries';

export default function Test() {
    const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
        // pass URL parameter
        variables: { id: "64629913348a7ac16139e3e9" },
    });
    
    const trip = data?.trip || [];

    return (
        <div>
            {console.log(trip)}
            <h3>{trip.location}</h3>
            <h3>{trip.createdAt}</h3>

        </div>
    )
}