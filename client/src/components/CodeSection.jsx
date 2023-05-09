import { useState, useEffect } from "react";
import Editor from "./Editor";

function CodeSection({setSrcDoc}) {
  const sampleHtml = `<h1 id="demo" >I am a headline made with HTML</h1>
  <p>And I am a simple text paragraph. The color of this text is styled with CSS. Click the button below to remove me through the power JavaScript.</p>
  <button onclick="myFunction()">Hide the text above</button>`;
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
  const sampleJavascript = `function myFunction() {
    document.getElementById("demo").innerHTML = "Hello World";
  }`;
  const [html, setHtml] = useState(sampleHtml);
  const [css, setCss] = useState(sampleCss);
  const [javascript, setJavascript] = useState(sampleJavascript);
  
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
  );
}

export default CodeSection;
