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
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-900 duration-400"
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
