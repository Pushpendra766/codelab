import { useState} from "react";
import "./init.js";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import CodeSection from "./components/CodeSection.jsx";
import Output from "./components/Output.jsx";
import FileInfoBar from "./components/FileInfoBar.jsx";
import FileOpenerModal from "./components/Modals/FileOpenerModal.jsx"
import LoginModal from "./components/Modals/LoginModal.jsx";

function App() {
  const [srcDoc, setSrcDoc] = useState();
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <div>
      <Navbar setIsModalOpen={setIsLoginModalOpen}/>
      <FileInfoBar setIsModalOpen={setIsFileModalOpen}/>
      <CodeSection setSrcDoc={setSrcDoc}/>
      <Output srcDoc={srcDoc}/>
      <FileOpenerModal isModalOpen={isFileModalOpen} setIsModalOpen={setIsFileModalOpen}/>
      <LoginModal isModalOpen={isLoginModalOpen} setIsModalOpen={setIsLoginModalOpen}/>
    </div>
  );
}

export default App;
