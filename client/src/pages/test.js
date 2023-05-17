import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

export default function Test() {
    const { loading, data } = useQuery(QUERY_USER, {
        // pass URL parameter
        variables: { username: "itsmegrace" },
    });
    
    const user = data?.user || [];

    return (
        <div>
            {console.log(user)}
            <h3>{user.username}</h3>
            <h3>{user.email}</h3>
            <h3>{user.trips[0].location}</h3>
        </div>
    )
}