import OpenAI from 'openai';
console.log(process.env)
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY, // defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser: true
});

export async function runOpenAi(sourceLanguage: string, targetLang: string, prompt: string) {
  const finalPrompt = `Translate the following into ${targetLang} from ${sourceLanguage}: ${prompt}`
  const completion = await openai.chat.completions.create({
    messages: [
      { "role": "system", "content": "You are a translator." },
      { "role": "user", "content": finalPrompt }
    ],
    model: 'gpt-3.5-turbo',
  });
  return completion.choices
}