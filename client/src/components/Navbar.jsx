import React from "react";
import { SiApostrophe } from "react-icons/si";

const Navbar = ({setIsModalOpen}) => {
  const handleOpen = ()=>{
    setIsModalOpen(true);
  }
  return (
    <div className="bg-[#0A2647] py-2 sm:py-3 px-4 sm:px-10 flex justify-between">
      <div className="text-[#ffffff] text-xl font-semibold flex gap-2 sm:gap-4">
        <SiApostrophe size={25}/> Codelab
      </div>
      <div className="flex gap-2 sm:gap-4">
        <button className="text-[#ffffff] bg-[#2C74B3] px-3 sm:px-4 text-sm sm:text-base py-1 rounded-full font-semibold hover:bg-[#205295]" onClick={handleOpen}>Login</button>
        <button className="text-[#ffffff] bg-[#2C74B3] px-3 sm:px-4 text-sm sm:text-base py-1 rounded-full font-semibold hover:bg-[#205295]" onClick={handleOpen}>Signup</button>
      </div>
    </div>
  );
};

export default Navbar;
