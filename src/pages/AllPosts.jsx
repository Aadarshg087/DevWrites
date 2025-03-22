import React from "react";
import { useState, useEffect } from "react";
import appwriteService from "../appwrite/service.appwrite.js";
import { PostCard } from "../components";

const AllPosts = () => {
  const [post, setPost] = useState([]);
  const [previews, setPreviews] = useState({});

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

  useEffect(() => {
    const fetchPreviews = async () => {
      const newPreviews = {};
      console.log("posts from previews", post);

      for (const p of post) {
        try {
          console.log("featuredImage", p);
          newPreviews[p.$id] = await appwriteService.getFilePreview(
            p.featuredImage
          );
        } catch (err) {
          console.log("Error fetching the preview image:", err);
        }
      }
      console.log("previews", newPreviews);
      setPreviews(newPreviews);
    };
    fetchPreviews();
  }, [post]);

  console.log(post);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
      {post.length > 0 ? (
        post.map((p) => (
          <div key={p.$id} className="bg-white rounded-lg shadow-lg p-4">
            {console.log("p", p)}
            <PostCard
              id={p.$id}
              title={p.title}
              featuredImage={previews[p.$id]}
            />
          </div>
        ))
      ) : (
        <h1>There are no posts</h1>
      )}
    </div>
  );
};

export default AllPosts;
