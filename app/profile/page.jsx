"use client"

import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import Profile from "@components/Profile"



const Profiles = () => {

    const router=useRouter();

    const {data:session}=useSession();

    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        const fetchPosts=async()=>{
          const response=await fetch(`/api/users/${session?.user.id}/posts`);
          const data=await response.json();
          console.log(data);
          setPosts(data)
        }
        console.log(posts)
        if(session?.user.id){
          fetchPosts();
        }
      },[])

    const handleEdit=(post)=>{
        router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete=async(post)=>{
        const hasConfirmed=confirm('Are you sure want to delete the prompt');
        if(hasConfirmed){
          try{
            await fetch(`/api/prompt/${post._id.toString()}`,{
              method:'DELETE',
            });
            const filteredPost=posts.filter((p)=>p._id!==post._id);
            setPosts(filteredPost);

          }
          catch(error){
            console.log(error)
          }
        }

    }


  return (
    <Profile name="My" desc="Welcome to your personalized profile page" data={posts} handleEdit={handleEdit} handleDelete={handleDelete}/>
  )
}

export default Profiles