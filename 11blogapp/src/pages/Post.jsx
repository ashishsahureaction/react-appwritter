import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams} from "react-router-dom"
import appwriteService from "../appwrite/config"
import Button from "../components/Button"
import Container from "../components/container/Container"
import parse from "html-react-parser"
import {useSelector } from "react-redux"

function Post() {
 
        navigate("/")
      
    
  return post  (
    <div className="py-8">
      <Container>
       
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" 
              onClick={deletePost}
              >Delete</Button>
           
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Post