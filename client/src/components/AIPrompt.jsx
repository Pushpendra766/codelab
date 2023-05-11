import React, { useState } from "react";
import { SiCodemagic } from "react-icons/si";
import { Configuration, OpenAIApi } from "openai";
import { javascript } from "@codemirror/lang-javascript";

const AIPrompt = (props) => {
  const { setHtml, setCss, setJavascript, setSrcDoc } = props;
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: import.meta.env.VITE_API_KEY,
    })
  );
  const [prompt, setPrompt] = useState();

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  let response;

  const searchCode = (prompt) => {
    console.log("Prompt : ", prompt);
    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `create html, css and js code fragement for ${prompt}`,
          },
        ],
      })
      .then((res) => {
        response = res.data.choices[0].message.content;
        console.log(res.data.choices[0].finish_reason);
        setCode();
      });
  };

  const setCode = () => {
    const html = response.split("```")[1];
    const css = response.split("```")[3];
    const js = response.split("```")[5];
    if (html && html[0] === "h") {
      // to handel case when the code have extra html, css and js written in it
      setHtml(html.slice(4));
      setCss(css.slice(3));
      setJavascript(js.slice(10));
    } else {
      setHtml(html);
      setCss(css);
      setJavascript(js);
    }

    setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${javascript}</script>
      </html>`);
    console.log(html, css, js);
  };

  return (
    <div className="py-3 bg-[#62CDFF] mb-2 px-10 text-[#144272]">
      <div className="flex gap-4 w-2/3 mx-auto justify-between">
        <span className="text-lg font-semibold whitespace-nowrap">
          AI Prompt :{" "}
        </span>
        <input
          type="text"
          className="border-2 border-[#2C74B3] rounded-md pl-2 w-full"
          placeholder="What do you want to generate ?"
          value={prompt}
          onChange={handlePromptChange}
        />
        <button
          className="text-[#ffffff] bg-[#2C74B3] px-4 py-1 rounded-full font-semibold hover:bg-[#205295] flex gap-2"
          onClick={() => {
            prompt && searchCode(prompt);
          }}
        >
          Go <SiCodemagic className="mt-1" />
        </button>
      </div>
    </div>
  );
};

export default AIPrompt;
