import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { GrClose } from "react-icons/gr";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import { collection, doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";

const FileOpenerModal = ({
  isModalOpen,
  setIsModalOpen,
  setHtml,
  setCss,
  setJavascript,
  files,
  resetEditor,
  currentUserId,
  fetchFiles,
  setFileCopy,
  setCurrentFileName,
  setPrompt,
}) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateNewFile = () => {
    resetEditor();
    setIsModalOpen(false);
    setFileCopy("");
  };

  const handleOpenFile = (file) => {
    setHtml(file.html);
    setCss(file.css);
    setJavascript(file.js);
    setCurrentFileName(file.filename);
    setFileCopy(file);
    setIsModalOpen(false);
    setPrompt("");
  };

  const handleDeleteFile = (file) => {
    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, currentUserId);
    updateDoc(userDocRef, {
      file: arrayRemove(file),
    })
      .then(() => {
        toast.success("File deleted!");
        console.log("File removed from user:");
        fetchFiles();
      })
      .catch((error) => {
        console.error("Error removing file from user:", error);
      });
  };

  const timeConversion = (unixTime) => {
    const date = new Date(unixTime * 1000);
    const finalTimeString =
      date.toLocaleTimeString("en-US") + " " + date.toLocaleDateString("hi");
    return finalTimeString;
  };

  return (
    <div className="container mx-auto">
      <Modal isModalOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="bg-white p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Open file</h2>
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
          <div className="flex flex-col gap-2">
            <hr />
            {files.length !== 0 &&
              files.map((file, i) => {
                return (
                  <div key={i}>
                    <div className="flex justify-between cursor-default pb-2">
                      <span className="flex flex-col">
                        {i + 1}. {file.filename}
                        <span className="text-sm text-[#a6a5a4] pl-3 flex gap-1">
                          <span className="hidden sm:block">Modified : </span>
                          {timeConversion(file?.createdAt?.seconds)}
                        </span>
                      </span>

                      <div className="flex gap-4">
                        <button
                          className="bg-[#007bff] my-1.5 px-1.5 rounded-full text-white"
                          onClick={() => handleOpenFile(file)}
                        >
                          <AiOutlineFolderOpen size={21} />
                        </button>
                        <button
                          className="bg-[#f24a44] my-1.5 px-1.5 rounded-full text-white"
                          onClick={() => handleDeleteFile(file)}
                        >
                          <RiDeleteBin5Fill size={21} />
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
