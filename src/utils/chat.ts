import { OpenAI } from 'openai';

const OPENAI_API_KEY = import.meta.env.PUBLIC_OPENAI_API_KEY;

export const chat = async (inputText: string): Promise<string | null> => {
  const openai = new OpenAI(
    { apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true },
  );
  const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [ { role: "user", content: inputText } ]
  });

  return completion.choices[0].message.content ?? null;
}
