import React from "react";
import { SiApostrophe } from "react-icons/si";

const Navbar = () => {
  return (
    <div className="bg-[#0A2647] py-3 px-10 flex justify-between">
      <div className="text-[#ffffff] text-xl font-semibold flex gap-4">
        <SiApostrophe size={25}/> Codelab
      </div>
      <div className="flex gap-4">
        <button className="text-[#ffffff] bg-[#2C74B3] px-4 py-1 rounded-full font-semibold hover:bg-[#205295]">Login</button>
        <button className="text-[#ffffff] bg-[#2C74B3] px-4 py-1 rounded-full font-semibold hover:bg-[#205295]">Signup</button>
      </div>
    </div>
  );
};

export default Navbar;
