import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/service.appwrite.js";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  // console.log(title, featuredImage, $id);
  const [image, setImage] = useState("");
  useEffect(() => {
    appwriteService
      .getFilePreview(featuredImage)
      .then((url) => {
        setImage(url);
      })
      .catch((err) => {
        console.log("Error in getting the image", err);
      });
  }, []);

  console.log("hello");
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img src={image} alt={title} className="rounded-xl " />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
