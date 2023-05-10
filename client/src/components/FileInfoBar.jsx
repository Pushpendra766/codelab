import React, { useState } from "react";
import { VscFileCode } from "react-icons/vsc";
import { MdEdit, MdDone } from "react-icons/md";
import { BsFillCloudArrowUpFill } from "react-icons/bs";

const FileInfoBar = () => {
  const [filename, setFilename] = useState("Untitled");
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="bg-[#205295] px-10 py-3 mb-2 flex justify-between">
      <div className="text-white flex gap-4">
        <VscFileCode size={22} />
        {isEdit ? (
          <input
            type="text"
            value={filename}
            className="text-black border-0 m-0 pl-2"
            onChange={(e) => setFilename(e.target.value)}
          />
        ) : (
          filename
        )}
        <button className="text-white" onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? <MdDone size={20} /> : <MdEdit size={20} />}
        </button>
      </div>
      <div>
        <button className="text-[#ffffff] bg-[#16a34a] px-5 py-1 rounded-full font-semibold hover:bg-[#55ad33] flex gap-3">
          Save <BsFillCloudArrowUpFill size={24} />
        </button>
      </div>
    </div>
  );
};

export default FileInfoBar;
