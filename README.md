# GPT Translate

A React Native app that uses OpenAI's GPT-3 to translate text from one language to another. It uses OpenAI's Text-To-Speech API to read the translated text out loud. The app uses Expo and is written in TypeScript. A simple backend proxy is used to make the API calls to OpenAI. The backend is written in Node.js using Fastify and is also written in TypeScript.

## Setup

### Backend

Create a `.env` file in the `backend` directory with the `API_KEY`` for OpenAI.

### App

Create a `.env` file in the root directory with the urls for the backend.

For iOS use the `EXPO_PUBLIC_API_URL_IOS` variable. For Android use the `EXPO_PUBLIC_API_URL_ANDROID` variable.

## Installation

### Backend

Go to the `backend` directory.

`npm install`

`npm run build && npm run start`

### App

`npm install`

`npx expo start`
