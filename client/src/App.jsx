import { useState, useEffect } from "react";
import "./components/init.js";
import "./App.css";
import Editor from "./components/Editor";
import Navbar from "./components/Navbar.jsx";
import CodeSection from "./components/CodeSection.jsx";
import Output from "./components/Output.jsx";

function App() {
  const [srcDoc, setSrcDoc] = useState();
  return (
    <div className="">
      <Navbar />
      <CodeSection setSrcDoc={setSrcDoc}/>
      <Output srcDoc={srcDoc}/>
    </div>
  );
}

export default App;
