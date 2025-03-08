import React from "react";
import { useState, useEffect } from "react";
import appwriteService from "../appwrite/service.appwrite.js";
import { PostCard } from "../components";
import { Container } from "../components";

const AllPosts = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    appwriteService
      .getActivePosts([])
      .then((post) => {
        console.log(post);
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
          {post.length() > 0 ? (
            post.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard post={post} />
              </div>
            ))
          ) : (
            <h1>There are no posts</h1>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
