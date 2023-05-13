import React, { useState } from "react";
import { SiApostrophe } from "react-icons/si";
import { BiUserCircle } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast, { Toaster } from "react-hot-toast";

const Navbar = ({ setIsModalOpen, setIsSignup, isLoggedIn, setIsLoggedIn }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const handleOpen = (mode) => {
    if (mode === "signup") {
      setIsSignup(true);
    } else {
      setIsSignup(false);
    }
    setIsModalOpen(true);
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out!");
        setIsLoggedIn(false);
        setOpenDropdown(false);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <div>
      <Toaster />
      <div className="bg-[#0A2647] py-2 sm:py-3 px-4 sm:px-10 flex justify-between">
        <div className="text-[#ffffff] text-xl font-semibold flex gap-2 sm:gap-4">
          <SiApostrophe size={25} /> Codelab
        </div>
        {isLoggedIn ? (
          <button
            className="text-[#ffffff] text-lg font-semibold"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <BiUserCircle size={30} />
          </button>
        ) : (
          <div className="flex gap-2 sm:gap-4">
            <button
              className="text-[#ffffff] bg-[#2C74B3] px-3 sm:px-4 text-sm sm:text-base py-1 rounded-full font-semibold hover:bg-[#205295]"
              onClick={() => handleOpen("login")}
            >
              Login
            </button>
            <button
              className="text-[#ffffff] bg-[#2C74B3] px-3 sm:px-4 text-sm sm:text-base py-1 rounded-full font-semibold hover:bg-[#205295]"
              onClick={() => handleOpen("signup")}
            >
              Signup
            </button>
          </div>
        )}
      </div>
      {openDropdown && (
        <span className="absolute right-2 sm:right-10 bg-[#ffffff] py-2 px-4 rounded-md ">
          <button className="flex gap-2" onClick={handleLogout}>
            <CgLogOut size={20} className="mt-1" />
            Logout{" "}
          </button>
        </span>
      )}
    </div>
  );
};

export default Navbar;
