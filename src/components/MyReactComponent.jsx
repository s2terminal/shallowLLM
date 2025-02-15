import { useState } from 'react';

export default function MyReactComponent() {
  const [text, setText] = useState('Hello World');

  return (
    <>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <p>{text}</p>
    </>
  );
}
