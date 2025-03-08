import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index.js";
import appwriteService from "../../appwrite/service.appwrite.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }
      const DBPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (DBPost) {
        navigate(`/post/${DBPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileID = file.$id;
        data.featuredImage = fileID;
        const DBPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (DBPost) {
          navigate(`/post/${DBPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value?.title, { shouldValidate: true }));
      }

      return () => {
        subscription.unsubscribe();
      };
    });
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap 
       justify-around"
    >
      <div className=" w-1/2 flex flex-col justify-between">
        <Input
          label="Title : "
          placeholder="Title"
          className="mb-4 w-1/2"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug : "
          placeholder="Slug"
          className="mb-4 w-1/2"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
      </div>
      <div className=" w-1/2 flex flex-col justify-between items-right">
        <Input
          label="Feature Image : "
          type="file"
          className=" w-1/2   cursor-pointer"
          accept="image/png, image/jpg, image/jpeg image/gif "
          {...register("image")}
        />
        <Select
          label="Status : "
          options={["Active", "Inactive"]}
          className=" w-1/2"
          {...register("status", { required: true })}
        />
      </div>
      <RTE
        label="Content :"
        name="content"
        control={control}
        defaultValue={getValues("content")}
      />
      <div className="w-1/3 px-2">
        {post && (
          <div>
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          </div>
        )}
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="cursor-pointer hover:bg-blue-700 hover:text-white w-1/2 mt-10"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
