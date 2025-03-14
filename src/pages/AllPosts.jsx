import React from "react";
import { useState, useEffect } from "react";
import appwriteService from "../appwrite/service.appwrite.js";
import { PostCard, Container } from "../components";

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
    <div className="w-full py-8 ">
      <Container className="flex justify-start ">
        <div className="flex flex-wrap justify-between">
          {post.length > 0 ? (
            post.map((p) => (
              <div key={p.$id} className="p-2">
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
      </Container>
    </div>
  );
};

export default AllPosts;
