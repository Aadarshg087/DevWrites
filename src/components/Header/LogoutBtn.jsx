import React from "react";
import { useDispatch } from "react-redux";
import { authService } from "../../appwrite/auth.appwrite.js";
import { logout } from "../../store/authSlice.js";

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
    <button className="inline-block px-6 py-2 duration-200 hover:blue-100 rounded-full">
      Logout
    </button>
  );
};

export default LogoutBtn;
