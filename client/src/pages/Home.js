import React, { useState } from 'react';
import PostCard from '../components/PostCard'

export default function Home() {
    return (
        <PostCard location='New York' traveller='Grace' createdAt='05/24/2023' />
    )
}