import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-orange-600 px-10 py-5">
      <div className="flex justify-center items-center text-white">
        <Link to={"/"}>
          <h1 className="font-bold text-2xl ">Note Book</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
