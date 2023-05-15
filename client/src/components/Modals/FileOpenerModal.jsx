import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { GrClose } from "react-icons/gr";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";

const FileOpenerModal = ({
  isModalOpen,
  setIsModalOpen,
  setHtml,
  setCss,
  setJavascript,
  files,
  resetEditor,
}) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateNewFile = () => {
    resetEditor();
    setIsModalOpen(false);
  };

  const handleOpenFile = (html, css, js) => {
    setHtml(html);
    setCss(css);
    setJavascript(js);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto">
      <Modal isModalOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="bg-white p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Open</h2>
            <div className="flex gap-4">
              <button
                className="bg-[#26a541] text-white py-1 px-3 rounded-full flex gap-1"
                onClick={handleCreateNewFile}
              >
                New <IoMdAddCircle size={20} className="mt-1" />
              </button>
              <button onClick={handleCloseModal}>
                <GrClose />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <hr />
            {files.length !== 0 &&
              files.map((file, i) => {
                return (
                  <div key={i}>
                    <div className="flex justify-between pb-2 cursor-default">
                      <span>
                        {i + 1}. {file.filename}
                      </span>
                      <span className="text-sm text-[#a6a5a4]">
                        {file?.createdAt?.seconds}
                      </span>
                      <div className="flex gap-4">
                        <button
                          className="bg-[#007bff] text-white p-1 rounded-full"
                          onClick={() =>
                            handleOpenFile(file.html, file.css, file.js)
                          }
                        >
                          <AiOutlineFolderOpen size={20} />
                        </button>
                        <button className="bg-[#f24a44] text-white p-1 rounded-full">
                          <RiDeleteBin5Fill size={20} />
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
              {files.length === 0 && "No files found"}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FileOpenerModal;
