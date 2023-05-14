import { useState, useEffect } from "react";
import "./init.js";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import CodeSection from "./components/CodeSection.jsx";
import Output from "./components/Output.jsx";
import FileInfoBar from "./components/FileInfoBar.jsx";
import FileOpenerModal from "./components/Modals/FileOpenerModal.jsx";
import LoginModal from "./components/Modals/LoginModal.jsx";
import AIPrompt from "./components/AIPrompt.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";

function App() {
  const [srcDoc, setSrcDoc] = useState();
  const [html, setHtml] = useState();
  const [css, setCss] = useState();
  const [javascript, setJavascript] = useState();
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        console.log("User logged out..");
      }
    });
  }, []);

  return (
    <div>
      <Navbar
        setIsModalOpen={setIsLoginModalOpen}
        setIsSignup={setIsSignup}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <FileInfoBar
        setIsModalOpen={setIsFileModalOpen}
        html={html}
        css={css}
        javascript={javascript}
        currentUserId={currentUserId}
      />
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
        currentUserId={currentUserId}
        setHtml={setHtml}
        setCss={setCss}
        setJavascript={setJavascript}
      />
      <LoginModal
        isModalOpen={isLoginModalOpen}
        setIsModalOpen={setIsLoginModalOpen}
        isSignup={isSignup}
        setIsSignup={setIsSignup}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
}

export default App;
