import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.appwrite.js";
import { logout } from "../../store/authSlice.js";
import Button from "../Button.jsx";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => {
        console.log("There is some error in logging out", err);
      });
  };
  return (
    <Button
      onClick={logoutHandler}
      className="inline-block px-6 py-2 ml-2 duration-200 hover:bg-blue-700 hover:text-white cursor-pointer rounded-full"
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
