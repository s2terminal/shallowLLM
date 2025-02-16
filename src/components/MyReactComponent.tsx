import OpenAI from "openai";
import { useState } from 'react';

const chat = async (inputText: string): Promise<string | null> => {
  const openai = new OpenAI(
    { apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true },
  );
  const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [ { role: "user", content: inputText } ]
  });

  return completion.choices[0].message.content ?? null;
}

export default function MyReactComponent() {
  const [text, setText] = useState('Hello World');
  const [response, setResponse] = useState('');

  const handleChat = async () => {
    const res = await chat(text);
    if (res) {
      setResponse(res);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4">
          <textarea
            className="block w-full rounded-md outline-1 outline-gray-300"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="p-4">
          <button
            className="rounded-md px-2.5 py-1.5 ring-1 shadow-xs ring-gray-300 hover:ring-gray-500"
            onClick={handleChat}>
            実行
          </button>
          {response && <p>Response: {response}</p>}
        </div>
      </div>
    </>
  );
}
