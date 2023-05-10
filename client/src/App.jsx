import { useState, useEffect } from "react";
import "./init.js";
import "./App.css";
import Editor from "./components/Editor";
import Navbar from "./components/Navbar.jsx";
import CodeSection from "./components/CodeSection.jsx";
import Output from "./components/Output.jsx";
import FileInfoBar from "./components/FileInfoBar.jsx";

function App() {
  const [srcDoc, setSrcDoc] = useState();
  return (
    <div>
      <Navbar />
      <FileInfoBar/>
      <CodeSection setSrcDoc={setSrcDoc}/>
      <Output srcDoc={srcDoc}/>
    </div>
  );
}

export default App;
