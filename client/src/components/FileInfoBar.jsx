import React, { useEffect, useState } from "react";
import { VscFileCode } from "react-icons/vsc";
import { MdEdit, MdDone } from "react-icons/md";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { AiFillFolderOpen } from "react-icons/ai";
import {
  doc,
  updateDoc,
  collection,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

const FileInfoBar = ({
  setIsModalOpen,
  html,
  css,
  javascript,
  currentUserId,
  isLoggedIn,
  fetchFiles,
  currentFileName,
  setCurrentFileName,
  files,
  fileCopy,
  setFileCopy,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenModal = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      toast("Sign in to open the files!");
    }
  };
  const handleSave = async () => {
    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, currentUserId);

    //check if file already exist
    let alreadyExist = files.find((file) => file.filename === currentFileName);

    // fileCopy tells us that an existing file is being opened so it is already present to we will change alreadyExist to false
    if (fileCopy && fileCopy.filename === currentFileName) {
      alreadyExist = false;
    }

    if (isLoggedIn && !alreadyExist) {
      const newFile = {
        filename: currentFileName,
        html: html,
        css: css,
        js: javascript,
        createdAt: new Date(),
      };
      updateDoc(userDocRef, {
        file: arrayUnion(newFile),
      })
        .then(() => {
          toast.success("File Saved!");
          fetchFiles();
          setFileCopy(newFile);
        })
        .catch((error) => {
          toast.error("Something went wrong!");
          console.error("Error adding file to user:", error);
        });

      if (fileCopy) {
        updateDoc(userDocRef, {
          file: arrayRemove(fileCopy),
        })
          .then(() => {
            console.log("Updating file...");
            fetchFiles();
          })
          .catch((error) => {
            console.error("Error removing file from user:", error);
          });
      }
    } else {
      {
        !isLoggedIn && toast("Login to save the file!");
      }
      {
        alreadyExist && toast.error("File with this name already exist!");
      }
    }
  };
  return (
    <div className="bg-[#205295] px-4 sm:px-10 py-2 sm:py-3 flex justify-between">
      <div className="text-white flex gap-4 sm:gap-10">
        <button>
          <AiFillFolderOpen size={25} onClick={handleOpenModal} />
        </button>

        <div className="flex gap-2 text-base sm:text-lg  inline-block align-middle">
          <VscFileCode size={22} className="mt-1" />
          {isEdit ? (
            <input
              type="text"
              value={currentFileName}
              className="text-black border-0 m-0 pl-2 w-1/2"
              onChange={(e) => setCurrentFileName(e.target.value)}
            />
          ) : (
            currentFileName
          )}
          <button className="text-white" onClick={() => setIsEdit(!isEdit)}>
            {isEdit ? <MdDone size={20} /> : <MdEdit size={20} />}
          </button>
        </div>
      </div>
      <div>
        <button
          className="text-[#ffffff] bg-[#16a34a] px-3 sm:px-5 text-sm sm:text-base py-1 rounded-full font-semibold hover:bg-[#55ad33] flex gap-2 sm:gap-3"
          onClick={handleSave}
        >
          Save <BsFillCloudArrowUpFill size={24} />
        </button>
      </div>
    </div>
  );
};

export default FileInfoBar;
