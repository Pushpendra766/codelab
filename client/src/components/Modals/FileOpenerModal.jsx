import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { GrClose } from "react-icons/gr";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { db } from "../../firebase";
import { collection, doc, getDoc } from "firebase/firestore";

const FileOpenerModal = ({
  isModalOpen,
  setIsModalOpen,
  currentUserId,
  setHtml,
  setCss,
  setJavascript,
}) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [files, setFiles] = useState([]);
  const fetchFiles = () => {
    console.log(currentUserId);
    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, currentUserId);

    getDoc(userDocRef)
      .then((doc) => {
        const f = doc.data().file;
        setFiles(f);
        console.log("Files for user", currentUserId, ":", f);
      })
      .catch((error) => {
        console.error("Error retrieving files for user:", error);
      });
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
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4" onClick={fetchFiles}>
              Open
            </h2>
            <button onClick={handleCloseModal}>
              <GrClose />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <hr />
            {files.map((file, i) => {
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
                        className="bg-[#26a541] text-white p-1 rounded-full"
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
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FileOpenerModal;
