import React from "react";

const Container = ({ children, className }) => {
  return (
    <div
      className={`w-full  mx-auto px-4 flex justify-center items-center  ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
