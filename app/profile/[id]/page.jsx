"use client"

import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserProfilePage = ({params}) => {
    const searchParams=useSearchParams();
    const userName=searchParams.get("name");

    const [usersPost,setusersPost]=useState([]);

    useEffect(()=>{
        const fetchPosts=async()=>{
            const response=await fetch(`/api/users/${params?.id}/posts`);
            const data=await response.json();
            setusersPost(data);
        }
        console.log(params)
        if(params?.id){
            fetchPosts();
        }
    },[params.id]);
    


    return(
        <Profile 
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={usersPost}
        />

    )
}
  

export default UserProfilePage