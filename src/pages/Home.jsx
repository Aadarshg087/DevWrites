import React from "react";
import { useEffect, useState } from "react";
import appwriteService from "../appwrite/service.appwrite.js";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getActivePosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  const checkLogin = () => {
    // const res =
    return useSelector((state) => state.auth.status);
  };
  if (!checkLogin()) {
    return <Container>Login to see the posts</Container>;
  } else if (posts.length === 0)
    return <Container className="min-h-60 ">No Blogs!</Container>;
  else {
    <div className="w-full py-8">
      <Container>
        <div className="flex- flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4 ">
              {/* <PostCard post={post} /> */}
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>;
  }
};

export default Home;
