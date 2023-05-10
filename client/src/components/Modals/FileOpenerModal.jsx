import React from "react";
import Modal from "./Modal";
import { GrClose } from "react-icons/gr";
import { AiOutlineFolderOpen } from "react-icons/ai";
import {RiDeleteBin5Fill} from "react-icons/ri"

const FileOpenerModal = ({ isModalOpen, setIsModalOpen }) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const files = ["Project1", "Project2", "Project3", "Project4", "Project5"];
  return (
    <div className="container mx-auto">
      <Modal isModalOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="bg-white p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">Open</h2>
            <button onClick={handleCloseModal}>
              <GrClose />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <hr />
            {files.map((file, i) => {
              return (
                <div>
                  <div className="flex justify-between pb-2">
                    {i + 1}. {file}
                    <div className="flex gap-4">
                      <button className="bg-[#26a541] text-white p-1 rounded-full"><AiOutlineFolderOpen size={20}/></button>
                      <button className="bg-[#f24a44] text-white p-1 rounded-full"><RiDeleteBin5Fill size={20}/></button>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FileOpenerModal;
