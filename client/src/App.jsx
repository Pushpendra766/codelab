import { useState, useEffect } from "react";
import "./components/init.js";
import "./App.css";
import Editor from "./components/Editor";

function App() {
  const sampleHtml = `<h1>I am a headline made with HTML</h1>
  <p>And I am a simple text paragraph. The color of this text is styled with CSS. Click the button below to remove me through the power JavaScript.</p>
  <button>Hide the text above</button>`;
  const sampleCss = `body {
    font-family: sans-serif;
    text-align: center;
    padding: 3rem;
    font-size: 1.125rem;
    line-height: 1.5;
    transition: all 725ms ease-in-out;
  }
  
  h1 {
    font-size: 2rem;
    font-weight: bolder;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
    color: tomato;
  }
  
  button {
    cursor: pointer;
    appearance: none;
    border-radius: 4px;
    font-size: 1.25rem;
    padding: 0.75rem 1rem;
    border: 1px solid navy;
    background-color: dodgerblue;
    color: white;
  }`;
  const sampleJavascript = `$('button').on('click', function() {
    $('p').css('opacity', 0);
  });`;
  const [html, setHtml] = useState(sampleHtml);
  const [css, setCss] = useState(sampleCss);
  const [javascript, setJavascript] = useState(sampleJavascript);
  const [srcDoc, setSrcDoc] = useState();
  useEffect(() => {
    setTimeout(() => {
      setSrcDoc(`<html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${javascript}</script>
    </html>`);
    }, 250);
  }, [html, css, javascript]);
  return (
    <div className="mx-0">
      {/* <nav className="bg-[#fff000]">Navbar</nav> */}
      <div className="w-full flex flex-row justify-around text-base gap-2">
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
      <div>
        <iframe
          className="w-full h-80"
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}

export default App;
