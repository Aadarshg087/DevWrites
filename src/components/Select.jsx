import React, { useId } from "react";
import { forwardRef } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
  const id = useId();
  console.log(options);
  return (
    <div>
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <select
        name=""
        defaultValue={options[0]}
        className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 `}
        ref={ref}
        {...props}
        id={id}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default forwardRef(Select);
