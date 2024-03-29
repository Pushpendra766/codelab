import { useState, useEffect } from "react";
import "./init.js";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import CodeSection from "./components/CodeSection.jsx";
import Output from "./components/Output.jsx";
import FileInfoBar from "./components/FileInfoBar.jsx";
import FileOpenerModal from "./components/Modals/FileOpenerModal.jsx";
import LoginModal from "./components/Modals/LoginModal.jsx";
import KeyGetterModal from "./components/Modals/KeyGetterModal.jsx";
import AIPrompt from "./components/AIPrompt.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase.js";
import { collection, doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";

function App() {
  const [srcDoc, setSrcDoc] = useState();
  const [html, setHtml] = useState();
  const [css, setCss] = useState();
  const [javascript, setJavascript] = useState();
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isKeyGetterModalOpen, setIsKeyGetterModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();
  const [files, setFiles] = useState([]);
  const [currentFileName, setCurrentFileName] = useState("Untitled");
  const [prompt, setPrompt] = useState("");
  const [fileCopy, setFileCopy] = useState("");
  const [openAIApiKey, setOpenAIApiKey] = useState(
    Cookies.get("OPENAI_API_KEY")
  );
  const fetchFiles = () => {
    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, currentUserId);

    getDoc(userDocRef)
      .then((doc) => {
        const f = doc.data().file;
        setFiles(f);
      })
      .catch((error) => {
        console.error("Error retrieving files for user:", error);
      });
  };

  const resetEditor = () => {
    setCurrentFileName("Untitled");
    setHtml("");
    setCss("");
    setJavascript("");
    setPrompt("");
    setCurrentUserId("");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
        fetchFiles(currentUserId);
      } else {
        console.log("User logged out..");
      }
    });
  }, [currentUserId]);

  return (
    <div>
      <Navbar
        setIsModalOpen={setIsLoginModalOpen}
        setIsSignup={setIsSignup}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        resetEditor={resetEditor}
      />
      <FileInfoBar
        setIsModalOpen={setIsFileModalOpen}
        html={html}
        css={css}
        javascript={javascript}
        currentUserId={currentUserId}
        isLoggedIn={isLoggedIn}
        fetchFiles={fetchFiles}
        currentFileName={currentFileName}
        setCurrentFileName={setCurrentFileName}
        files={files}
        fileCopy={fileCopy}
        setFileCopy={setFileCopy}
        setHtml={setHtml}
        setCss={setCss}
        setJavascript={setJavascript}
      />
      <AIPrompt
        setHtml={setHtml}
        setCss={setCss}
        setJavascript={setJavascript}
        prompt={prompt}
        setPrompt={setPrompt}
        setIsKeyGetterModalOpen={setIsKeyGetterModalOpen}
        openAIApiKey={openAIApiKey}
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
        currentUserId={currentUserId}
        setHtml={setHtml}
        setCss={setCss}
        setJavascript={setJavascript}
        files={files}
        resetEditor={resetEditor}
        fetchFiles={fetchFiles}
        setFileCopy={setFileCopy}
        setCurrentFileName={setCurrentFileName}
        setPrompt={setPrompt}
      />
      <LoginModal
        isModalOpen={isLoginModalOpen}
        setIsModalOpen={setIsLoginModalOpen}
        isSignup={isSignup}
        setIsSignup={setIsSignup}
        setIsLoggedIn={setIsLoggedIn}
      />
      <KeyGetterModal
        isModalOpen={isKeyGetterModalOpen}
        setIsModalOpen={setIsKeyGetterModalOpen}
        setOpenAIApiKey={setOpenAIApiKey}
      />
    </div>
  );
}

export default App;
