import React, { useState, useEffect } from "react";
import { SiApostrophe } from "react-icons/si";
import { BiUserCircle } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import {
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { BiUserCheck } from "react-icons/bi";

const Navbar = ({ setIsModalOpen, setIsSignup, isLoggedIn, setIsLoggedIn, resetEditor }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState("");
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
        resetEditor();
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserEmail(user.email);
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
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
        <div className="absolute right-2 sm:right-10 bg-[#ffffff] rounded-md">
          <p className="flex gap-2 py-3 hover:cursor-default px-3">
            <BiUserCheck size={23} color="#16a34a" />
            {userEmail}
          </p>
          <hr/>
          <button className="flex gap-2 text-base pl-6 py-2 font-semibold w-full bg-[#ff0000] text-[#ffffff] rounded-b-md" onClick={handleLogout}>
            <CgLogOut size={20} className="mt-1" />
            Logout{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
