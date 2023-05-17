import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

export default function Test() {
    const username = Auth.getProfile().username;
    const { loading, data } = useQuery(QUERY_ME, {
        // pass URL parameter
        variables: { username: username },
    });
    
    const me = data?.me || [];

    return (
        <div>
            {console.log(me)}
            <h3>{me.username}</h3>
            <h3>{me.trips[0].location}</h3>
            <h3>{me.trips[0].season}</h3>

        </div>
    )
}