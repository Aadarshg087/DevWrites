import React from "react";
import { useState, useEffect } from "react";
import appwriteService from "../appwrite/service.appwrite.js";
import { PostCard, Container } from "../components";

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
  console.log(post);
  return (
    <div className="w-full py-8">
      <Container className="">
        <div className="flex flex-wrap">
          {post.length > 0 ? (
            post.map((p) => (
              <div key={p.$id} className="p-2">
                <PostCard
                  id={p.$id}
                  title={p.title}
                  featuredImage={p.featuredImage}
                />
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
