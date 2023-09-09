import React, { useState } from "react";
import Modal from "./Modal";
import { GrClose } from "react-icons/gr";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const KeyGetterModal = ({ isModalOpen, setIsModalOpen, setOpenAIApiKey }) => {
  const [key, setKey] = useState();
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOnSave = () => {
    Cookies.set("OPENAI_API_KEY", key);
    setOpenAIApiKey(key);
    setIsModalOpen(false);
  };
  return (
    <div className="container mx-auto">
      <Toaster />
      <Modal isModalOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="bg-white p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">Enter OpenAI API key</h2>
            <button onClick={handleCloseModal}>
              <GrClose />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Paste API key here"
              className="py-2 pl-2 border-2 rounded-md"
              onChange={(e) => setKey(e.target.value)}
            />
            <p className="text-sm text-[#7a7d7b]">
              * Your API key will be stored in your local cookies only. And will
              not be sent to server. <br />* Due to change in OpenAI's API
              plans. We are not able to provide API key from our side at this time. We are
              working on solving this.
            </p>
            <button
              className="text-[#ffffff] bg-[#2C74B3] px-4 py-2 rounded-full font-semibold hover:bg-[#205295]"
              type="submit"
              onClick={handleOnSave}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default KeyGetterModal;
