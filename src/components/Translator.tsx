import { useState } from 'react';
import { chat } from '../utils/chat';

export default function Translator() {
  const [systemMessage, setSystemMessage] = useState('入力を日本語に翻訳して');
  const [inputText, setInputText] = useState('Hello, how are you?');
  const [response, setResponse] = useState('');

  const handleChat = async () => {
    const res = await chat([
      { role: 'system', content: systemMessage },
      { role: 'user', content: inputText }
    ]);

    if (res) {
      setResponse('');
      for await (const chunk of res()) {
        setResponse(prev => prev + chunk);
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-1">
        <div className="col-span-2 p-2">
          <textarea
            className="block p-2 w-full rounded-md outline-1 outline-gray-300"
            value={systemMessage}
            onChange={(e) => setSystemMessage(e.target.value)}
            rows={2}
          />
        </div>
        <div className="p-2">
          <textarea
            className="block p-2 w-full h-full rounded-md outline-1 outline-gray-300"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={5}
          />
        </div>
        <div className="p-4">
          {response && <p>Response: {response}</p>}
        </div>
        <div className="col-span-2 p-2">
          <button
            className="w-full rounded-md px-2.5 py-1.5 ring-1 shadow-xs ring-gray-300 hover:ring-gray-500"
            onClick={handleChat}>
            実行
          </button>
        </div>
      </div>
    </>
  );
}
