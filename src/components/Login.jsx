import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth.appwrite.js";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authStatus) {
      navigate("/");
    }
  }, [authStatus]);

  const loginUser = async (data) => {
    console.log(data);
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log("userData", userData);
        if (userData) {
          alert("loggin in");
          navigate("/");
          dispatch(login(userData));
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center  ">
      <div className="mx-auto   bg-gray-100 rounded-xl  border-black/10 border-4 my-10 ">
        <div className="mb-2 flex justify-center ">
          <span className="inline-block">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && (
          <p className="text-red-600 mt-8 text-center border-4">{error}</p>
        )}
        <form onSubmit={handleSubmit(loginUser)} className="m-7 text-left">
          <div className="flex flex-col gap-5">
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
              placeholder="Enter password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              className="cursor-pointer hover:bg-blue-700 hover:text-white duration-200"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
