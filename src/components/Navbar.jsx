import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-[var(--blue-color)] p-4">
        <div className="max-w-screen-xl mx-auto p-2 md:p-2 flex justify-between items-center">
          <Link
            to="/"
            className="text-white text-lg font-bold flex items-center"
          >
            <img src={Logo} alt="Logo" className="h-8 w08 mr-2" />
          </Link>
          <Link to="/" className="text-white  ">
            Home
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
