import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/service.appwrite";
import appwriteAuth from "../appwrite/auth.appwrite";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";

const CurrPost = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [currPost, setCurrPost] = useState({});
  const [filePreview, setFilePreview] = useState("");
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  console.log("params", params);

  useEffect(() => {
    setLoading(true);
    appwriteService
      .getPost(params.slug)
      .then((data) => {
        console.log("data: ", data);
        setCurrPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("there is some erro getting the posts", err);
      });
  }, [params.slug]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const preview = await appwriteService.getFilePreview(
          currPost.featuredImage
        );
        setFilePreview(preview);
      } catch (err) {
        console.log("Getting error in getting the image: ", err);
      }
    };
    fetchImage();
  }, [currPost?.featuredImage]);

  useEffect(() => {
    const CheckEdit = async () => {
      const Cuser = await appwriteAuth.getCurrentUser();
      if (Cuser) {
        console.log("current user from DB: ", Cuser.$id);
        if (Cuser.$id == currPost.userId) {
          setUser(true);
        } else setUser(false);
      } else navigate("/login");
    };
    CheckEdit();
  }, [currPost?.userId]);
  console.log("currPost", currPost);

  if (loading) {
    return <h2>Loading ...</h2>;
  } else
    return (
      <>
        <div className=" bg-white text-black rounded-xl w-3/4 mx-auto my-10 p-5 ">
          <img
            src={filePreview}
            alt="Some Image"
            className=" block mx-auto h-[500px]"
          />
          <h1 className="mb-10 font-bold text-3xl">{currPost?.title}</h1>
          <p className="flex flex-col text-left">
            {parse(String(currPost?.content))}
          </p>
        </div>
        {console.log("userrrrrr", user)}
        {user && (
          <Button onClick={() => navigate(`/edit-post/${params.slug}`)}>
            Edit Post
          </Button>
        )}
      </>
    );
};

export default CurrPost;
