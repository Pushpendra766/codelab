import React from "react";
import Modal from "./Modal";
import { GrClose } from "react-icons/gr";

const LoginModal = ({ isModalOpen, setIsModalOpen }) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="container mx-auto">
      <Modal isModalOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="bg-white p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <button onClick={handleCloseModal}>
              <GrClose />
            </button>
          </div>
          <div className="flex flex-col gap-4">
           <p>Username : <input type="text" className="border rounded-md"/></p>
           <p>Password : <input type="text" className="border rounded-md"/></p>
           <button className="text-[#ffffff] bg-[#2C74B3] px-4 py-1 rounded-full font-semibold hover:bg-[#205295]">Login</button>
           <hr/>
           <button className="text-[#ffffff] bg-[#16a34a] px-4 py-1 rounded-full font-semibold hover:bg-[#55ad33] w-1/2 mx-auto">Create new account </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
