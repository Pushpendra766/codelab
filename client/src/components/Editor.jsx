import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { ImHtmlFive } from "react-icons/im";
import { DiCss3 } from "react-icons/di";
import { IoLogoJavascript } from "react-icons/io";
import { FiMinimize2 } from "react-icons/fi";
import { FiMaximize } from "react-icons/fi";

function Editor(props) {
  const { displayName, language, code, handleChange } = props;
  const [minimize, setMinimize] = useState(false);
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
    handleChange(value);
  }, []);
  const lang =
    (language === "html" && html({ html: true })) ||
    (language === "css" && css({ css: true })) ||
    (language === "js" && javascript({ jsx: true }));
  return (
    <div className={`${minimize ? "w-1/12" : "w-full"}`}>
      <div className="flex justify-between gap-4 px-2">
        <div className="flex gap-2">
          {language === "html" && <ImHtmlFive size={20} />}
          {language === "css" && <DiCss3 size={20} />}
          {language === "js" && <IoLogoJavascript size={20} />}
          {displayName}
        </div>
        <button
          onClick={() => {
            setMinimize(!minimize);
          }}
        >
          {minimize === true ? <FiMaximize /> : <FiMinimize2 />}
        </button>
      </div>
      <CodeMirror
        value={code}
        height="350px"
        theme={githubDark}
        extensions={[lang, EditorView.lineWrapping]}
        onChange={onChange}
      />
    </div>
  );
}
export default Editor;
