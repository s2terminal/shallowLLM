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
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <p>{text}</p>
      <button onClick={handleChat}>実行</button>
      {response && <p>Response: {response}</p>}
    </>
  );
}
