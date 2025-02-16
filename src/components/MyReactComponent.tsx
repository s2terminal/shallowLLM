import { useState } from 'react';
import { chat } from '../utils/chat';

export default function MyReactComponent() {
  const [text, setText] = useState('こんにちは');
  const [response, setResponse] = useState('');

  const handleChat = async () => {
    const res = await chat(text);
    if (res) {
      for await (const chunk of res()) {
        setResponse(prev => prev + chunk);
      }
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
