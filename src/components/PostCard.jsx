import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ id, title, featuredImage }) => {
  console.log("From the post card", title, featuredImage, id);

  return (
    <Link to={`/post/${id}`}>
      <div className=" bg-white rounded-xl p-4 h-[300px] w-[300px] mx-15 flex flex-col justify-between">
        <div className="bg-white rounded-lg shadow-lg p-2">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
        <h2 className="text-lg font-bold mt-2">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
