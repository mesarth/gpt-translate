export type TranslationResponse = {
  message?: string,
  inputLanguage?: string,
  error?: string
}

export async function translate(input: string, to: string): Promise<TranslationResponse> {
  console.log(process.env.EXPO_PUBLIC_API_URL);
  return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ input, to })
  })
    .then(res => res.json())
    .then(res => res as TranslationResponse)
    .catch(err => ({ error: err }));
}

export type Language = {
  name: string,
  native: string,
  flag: string
}

export const languages: Array<Language> = [
  {
    name: "English", 
    native: "English",
    flag: "🇺🇸 🇬🇧 🇦🇺 🇨🇦"
  },
  {
    name: "Mandarin Chinese", 
    native: "普通话/汉语",
    flag: "🇨🇳"
  },
  {
    name: "Spanish", 
    native: "Español",
    flag: " 🇪🇸🇲🇽"
  },
  {
    name: "Hindi", 
    native: "हिन्दी ",
    flag: "🇮🇳"
  },
  {
    name: "Arabic", 
    native: "العربية",
    flag: "🇸🇦 🇪🇬"
  },
  {
    name: "Bengali", 
    native: "বাংলা",
    flag: "🇧🇩"
  },
  {
    name: "Portuguese", 
    native: "Português",
    flag: "🇵🇹 🇧🇷"
  },
  {
    name: "Russian", 
    native: "Русский",
    flag: "🇷🇺"
  },
  {
    name: "Japanese", 
    native: "日本語 (にほんご)",
    flag: "🇯🇵"
  },
  {
    name: "German", 
    native: "Deutsch",
    flag: "🇩🇪"
  },
  {
    name: "French", 
    native: "Français",
    flag: "🇫🇷"
  },
  {
    name: "Urdu", 
    native: "اردو",
    flag: "🇵🇰"
  },
  {
    name: "Italian", 
    native: "Italiano",
    flag: "🇮🇹"
  },
  {
    name: "Korean", 
    native: "한국어",
    flag: "🇰🇷"
  },
  {
    name: "Turkish", 
    native: "Türkçe",
    flag: "🇹🇷"
  },
  {
    name: "Vietnamese", 
    native: "Tiếng Việt",
    flag: "🇻🇳"
  },
  {
    name: "Persian (Farsi)", 
    native: "فارسی ",
    flag: "🇮🇷"
  },
  {
    name: "Polish", 
    native: "Polski",
    flag: "🇵🇱"
  },
  {
    name: "Dutch", 
    native: "Nederlands",
    flag: "🇳🇱"
  },
  {
    name: "Indonesian", 
    native: "Bahasa Indonesia",
    flag: "🇮🇩"
  },
];

export type Translation = {
  input: string,
  inputLanguage: string,
  output: string,
  outputLanguage: string
}