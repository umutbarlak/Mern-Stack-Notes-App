import React from "react";

const Error = ({ error }) => {
  return (
    <div className="w-full bg-red-500 text-white mt-4 p-2 text-center">
      <p>{error}</p>
    </div>
  );
};

export default Error;
