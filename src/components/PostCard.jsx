import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ id, title, featuredImage }) => {
  console.log("From the post card", title, featuredImage, id);

  return (
    <Link to={`/post/${id}`}>
      <div className=" bg-gray-100 rounded-xl p-4 h-[300px] w-[300px]">
        <div className="w-full justify-center mb-4">
          <img src={featuredImage} alt={title} className="rounded-xl " />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
