import Fastify from 'fastify';
import { OpenAI } from 'openai';
import {FastifySSEPlugin} from "fastify-sse-v2";
require('dotenv').config()

const app = Fastify({ logger: true });
app.register(FastifySSEPlugin);


async function translate(input: string, to: string){
  const prompt = `
  Translate the input in quotes to ${to}. "${input}".
  Respond with a JSON object with either a message property with the translated input message and the inputLanguage property or an error property with the explanation why the translation is not possible e.g. "invalid input" or "unknown output language".
  Do not respond with anything apart from the JSON object.`;

  const client = new OpenAI({
    apiKey: process.env.API_KEY,
  });

  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo-1106',
    messages: [{ role: 'user', content: prompt }],
    response_format: { "type": "json_object" },
    stream: false,
  });

  return response;
}

app.post('/translate', async (request, reply) => {
  const { input, to } = request.body as { input: string, to: string };
  const response = await translate(input, to);
  return JSON.parse(response.choices[0].message?.content ?? '');
})

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})