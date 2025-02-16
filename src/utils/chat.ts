import { OpenAI } from 'openai';

const OPENAI_API_KEY = import.meta.env.PUBLIC_OPENAI_API_KEY;

type ChatHistory = {
  role: "user" | "assistant" | "system";
  content: string;
};

export const chat = async (input: ChatHistory[]): Promise<() => AsyncGenerator<string>> => {
  const openai = new OpenAI(
    { apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true },
  );
  const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: input,
      stream: true,
  });

  async function* ret(): AsyncGenerator<string> {
    for await (const chunk of completion) {
      yield chunk.choices[0]?.delta?.content || '';
    }
  }

  return ret;
}
