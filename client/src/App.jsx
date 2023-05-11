import { useState } from "react";
import "./init.js";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import CodeSection from "./components/CodeSection.jsx";
import Output from "./components/Output.jsx";
import FileInfoBar from "./components/FileInfoBar.jsx";
import FileOpenerModal from "./components/Modals/FileOpenerModal.jsx";
import LoginModal from "./components/Modals/LoginModal.jsx";
import AIPrompt from "./components/AIPrompt.jsx";

function App() {
  const [srcDoc, setSrcDoc] = useState();
  const [html, setHtml] = useState();
  const [css, setCss] = useState();
  const [javascript, setJavascript] = useState();
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <div>
      <Navbar setIsModalOpen={setIsLoginModalOpen} />
      {/* <FileInfoBar setIsModalOpen={setIsFileModalOpen}/> */}
      <AIPrompt
        setHtml={setHtml}
        setCss={setCss}
        setJavascript={setJavascript}
        setSrcDoc={setSrcDoc}
      />
      <CodeSection
        html={html}
        setHtml={setHtml}
        css={css}
        setCss={setCss}
        javascript={javascript}
        setJavascript={setJavascript}
        setSrcDoc={setSrcDoc}
      />
      {html && <Output srcDoc={srcDoc} />}
      <FileOpenerModal
        isModalOpen={isFileModalOpen}
        setIsModalOpen={setIsFileModalOpen}
      />
      <LoginModal
        isModalOpen={isLoginModalOpen}
        setIsModalOpen={setIsLoginModalOpen}
      />
    </div>
  );
}

export default App;
