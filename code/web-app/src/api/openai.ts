import OpenAI from 'openai';
console.log(process.env)
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY, // defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser: true
});

export async function runOpenAi() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices);
}

