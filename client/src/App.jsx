import { useState } from "react";
import "./App.css";
import Editor from "./components/Editor";

function App() {
  return (
    <div className="mx-0">
      <nav className="bg-[#fff000]">Navbar</nav>
      <div className="bg-[#ffff20] w-full flex flex-row justify-around">
        <div>html</div>
        <div>css</div>
        <div>js</div>
      </div>
      <div>Output</div>
    </div>
  );
}

export default App;
