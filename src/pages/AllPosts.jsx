import React from "react";
import { useState, useEffect } from "react";
import appwriteService from "../appwrite/service.appwrite.js";
import { PostCard } from "../components";

const AllPosts = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    appwriteService
      .getActivePosts([])
      .then((post) => {
        if (post) setPost(post.documents);
      })
      .catch((err) => {
        console.log("Error in fetching all the posts", err);
      });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
