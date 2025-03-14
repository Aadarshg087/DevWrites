import React from "react";
import { useEffect, useState } from "react";
import appwriteService from "../appwrite/service.appwrite.js";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

const checkLogin = () => {
  // const res =
  return useSelector((state) => state.auth.status);
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filePreviews, setFilePreviews] = useState({});

  useEffect(() => {
    appwriteService.getActivePosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  // getting file previews
  const getFile = (fileID) => {
    console.log(fileID);
    return appwriteService
      .getFilePreview(fileID)
      .then((url) => {
        console.log(url);
        return url;
      })
      .catch((err) => {
        console.log("Error in getting the file", err);
        return "";
      });
  };

  useEffect(() => {
    const fetchPreviews = async () => {
      // console.log(posts.length);
      const previews = {};
      for (const post of posts) {
        // console.log("id", post.$id);
        previews[post.$id] = await getFile(post.featuredImage);
      }
      console.log("previews", previews);
      setFilePreviews(previews);
    };
    fetchPreviews();
  }, [posts]);

  if (!checkLogin()) {
    return (
      <Container className="h-[300px] text-3xl">
        Login to see the posts
      </Container>
    );
  } else if (posts.length === 0)
    return <Container className="min-h-60 ">No Blogs!</Container>;
  else {
    return (
      <>
        <div className="w-full py-8">
          <Container>
            <div className="flex flex-wrap">
              {posts.map((post) => {
                {
                  console.log("posts main: ", post);
                  console.log("id main: ", post.$id);
                }
                return (
                  <div key={post.$id} className="p-2 w-1/4 ">
                    <PostCard
                      id={post.$id}
                      title={post.title}
                      featuredImage={filePreviews[post.$id]}
                    />
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
        ;
      </>
    );
  }
};

export default Home;
