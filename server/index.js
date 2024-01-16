"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const openai_1 = require("openai");
const fastify_sse_v2_1 = require("fastify-sse-v2");
require('dotenv').config();
const app = (0, fastify_1.default)({ logger: true });
app.register(fastify_sse_v2_1.FastifySSEPlugin);
function translate(input, to) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = `Translate the input in quotes to ${to}. "${input}" Respond with a JSON object with either a message property with the translated input message or an error property with the explanation why the translation is not possible e.g. "invalid input" or "unknown output language". do not respond with anything apart from the JSON object.`;
        const client = new openai_1.OpenAI({
            apiKey: process.env.API_KEY,
        });
        const response = yield client.chat.completions.create({
            model: 'gpt-3.5-turbo-1106',
            messages: [{ role: 'user', content: prompt }],
            response_format: { "type": "json_object" },
            stream: false,
        });
        return response;
    });
}
app.post('/translate', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { input, to } = request.body;
    const response = yield translate(input, to);
    return JSON.parse((_b = (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) !== null && _b !== void 0 ? _b : '');
}));
app.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
