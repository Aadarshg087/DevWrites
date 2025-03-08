import React, { useEffect, useState } from "react";
import authService from "../appwrite/auth.appwrite";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authStatus) {
      alert("User is already logged in ");
      navigate("/");
    }
  }, []);

  const Signup = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      console.log(session);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError("error ka msg : ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="mx-auto   bg-gray-100 rounded-xl  border-black/10 border-4 my-10 p-10 ">
        <div
          className={` mx-auto w-full max-w-lg bg-gray-100 rounded-xl   border-black/10`}
        >
          <Logo width="100%" />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Create a new account
        </h2>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(Signup)} className="m-7 text-left">
          <div className="flex flex-col gap-5">
            <Input
              label="Full Name"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="cursor-pointer hover:bg-blue-700 hover:text-white duration-200"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
