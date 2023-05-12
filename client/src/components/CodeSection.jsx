import { useState, useEffect } from "react";
import Editor from "./Editor";
import { ImHtmlFive } from "react-icons/im";
import { DiCss3 } from "react-icons/di";
import { IoLogoJavascript } from "react-icons/io";

function CodeSection(props) {
  const { html, setHtml, css, setCss, javascript, setJavascript, setSrcDoc } =
    props;

  const [activeCode, setActiveCode] = useState("html");

  useEffect(() => {
    setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${javascript}</script>
      </html>`);
    }, 250);
  }, [html, css, javascript]);

  return (
    <>
      <div className="hidden w-full lg:flex flex-row justify-around text-base gap-2">
        <Editor
          displayName="HTML"
          language="html"
          code={html}
          handleChange={setHtml}
        />
        <Editor
          displayName="CSS"
          language="css"
          code={css}
          handleChange={setCss}
        />
        <Editor
          displayName="JavaScript"
          language="js"
          code={javascript}
          handleChange={setJavascript}
        />
      </div>
      <div className="lg:hidden w-full flex flex-row px-2 sm:px-10 gap-2 text-base">
        <div className="py-4 flex flex-col gap-2">
          <button
            className={`${
              activeCode === "html" && "text-white bg-[#2C74B3]"
            } px-2 py-2 rounded-md`}
            onClick={() => {
              setActiveCode("html");
            }}
          >
            <ImHtmlFive size={23} />
          </button>
          <button
            className={`${
              activeCode === "css" && "text-white bg-[#2C74B3]"
            } px-2 py-2 rounded-md`}
            onClick={() => {
              setActiveCode("css");
            }}
          >
            <DiCss3 size={26} />
          </button>
          <button
            className={`${
              activeCode === "js" && "text-white bg-[#2C74B3]"
            } px-2 py-2 rounded-md`}
            onClick={() => {
              setActiveCode("js");
            }}
          >
            <IoLogoJavascript size={22} />
          </button>
        </div>
        <div className="w-full">
          {activeCode === "html" && (
            <Editor
              displayName="HTML"
              language="html"
              code={html}
              handleChange={setHtml}
            />
          )}
          {activeCode === "css" && (
            <Editor
              displayName="CSS"
              language="css"
              code={css}
              handleChange={setCss}
            />
          )}
          {activeCode === "js" && (
            <Editor
              displayName="JavaScript"
              language="js"
              code={javascript}
              handleChange={setJavascript}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CodeSection;
