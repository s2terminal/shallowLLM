import { OpenAI } from 'openai';

const OPENAI_API_KEY = import.meta.env.PUBLIC_OPENAI_API_KEY;

export const chat = async (inputText: string): Promise<() => AsyncGenerator<string>> => {
  const openai = new OpenAI(
    { apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true },
  );
  const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [ { role: "user", content: inputText } ],
      stream: true,
  });

  async function* ret(): AsyncGenerator<string> {
    for await (const chunk of completion) {
      yield chunk.choices[0]?.delta?.content || '';
    }
  }

  return ret;
}
