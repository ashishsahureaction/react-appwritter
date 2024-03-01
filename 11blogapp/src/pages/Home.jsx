import React from 'react'
import appwriteService from "../appwrite/config"
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from "../components/PostCard"

function Home() {

  const [posts, setPosts] = useState([])

 

  return (
    <div className='w-full py-8'>
   
       
              <PostCard />
          
    
    </div>
  )
}

export default Home