import { useState} from "react";
import "./init.js";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import CodeSection from "./components/CodeSection.jsx";
import Output from "./components/Output.jsx";
import FileInfoBar from "./components/FileInfoBar.jsx";
import FileOpenerModal from "./components/Modals/FileOpenerModal.jsx"

function App() {
  const [srcDoc, setSrcDoc] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <FileInfoBar setIsModalOpen={setIsModalOpen}/>
      <CodeSection setSrcDoc={setSrcDoc}/>
      <Output srcDoc={srcDoc}/>
      <FileOpenerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
}

export default App;
