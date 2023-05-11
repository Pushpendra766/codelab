import { useEffect } from "react";
import Editor from "./Editor";

function CodeSection(props) {
  const { html, setHtml, css, setCss, javascript, setJavascript, setSrcDoc } =
    props;
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
