import "./App.css";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import authService from "./appwrite/auth.appwrite.js";
import { login, logout } from "./store/authSlice.js";
import { Footer, Header } from "./components/index.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        // console.log("userData", userData);
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400 p-0 m-0">
      <div className="w-full block text-center">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
