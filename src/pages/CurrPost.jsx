import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/service.appwrite";
import parse from "html-react-parser";

const CurrPost = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [currPost, setCurrPost] = useState({});

  console.log("params", params);

  useEffect(() => {
    setLoading(true);
    appwriteService
      .getPost(params.slug)
      .then((data) => {
        console.log("data: ", data);
        setCurrPost(data);
      })
      .catch((err) => {
        console.log("there is some erro getting the posts", err);
      });
    setLoading(false);
  }, []);
  console.log("currPost", currPost);

  function getImage(fileID) {
    appwriteService
      .getFilePreview(fileID)
      .then((link) => {
        console.log(link);
        return link;
      })
      .catch((err) => {
        console.log("There is some error in the fetching the image", err);
      });
  }

  if (loading) {
    return <h2>Loading ...</h2>;
  } else
    return (
      <div className=" bg-white text-black rouned-xl w-3/4 mx-auto my-10 p-5 ">
        <img src={getImage(currPost.featuredImage)} alt="Some Image" />
        <h1 className="mb-10 font-bold text-3xl">{currPost?.title}</h1>
        <p className="flex flex-col text-left">
          {parse(String(currPost?.content))}
        </p>
      </div>
    );
};

export default CurrPost;
