import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation();

  useEffect(() => {
    if (authStatus) {
      navigate(location.pathname);
    } else if (authStatus === false) {
      navigate("/login");
    }

    // if (authentication && authStatus !== authentication) {
    //   navigate("/login");
    // } else if (!authentication && authStatus !== authentication) {
    //   navigate(location.pathname);
    // }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default Protected;
