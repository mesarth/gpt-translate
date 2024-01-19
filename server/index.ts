import Fastify, { FastifyRequest } from 'fastify';
import { OpenAI } from 'openai';
import { FastifySSEPlugin } from "fastify-sse-v2";
import { SpeechCreateParams } from 'openai/resources/audio/speech';
require('dotenv').config()

const app = Fastify({ logger: true });
app.register(FastifySSEPlugin);


async function translate(input: string, to: string) {
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


type TTSRequest = FastifyRequest<{
  Querystring: {
    text: string,
    voice: SpeechCreateParams["voice"]
  }
}>

app.get('/text-to-speech', async (request: TTSRequest, reply) => {
  let { text, voice } = request.query;

  const client = new OpenAI({
    apiKey: process.env.API_KEY,
  });

  const response = await client.audio.speech.create({
    model: 'tts-1',
    input: text,
    voice: voice,
  });

  // Set headers for chunked transfer encoding
  reply.raw.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Transfer-Encoding': 'chunked'
  });

  const stream = response?.body;
  if (stream) {
    reply.send(stream);
  }
});

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})