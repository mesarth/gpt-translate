export type TranslationResponse = {
  message?: string,
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

export const languages: Array<string> = [
  "English - English 🇺🇸 🇬🇧 🇦🇺 🇨🇦",
  "Mandarin Chinese - 普通话/汉语 🇨🇳",
  "Spanish - Español 🇪🇸 🇲🇽",
  "Hindi - हिन्दी 🇮🇳",
  "Arabic - العربية 🇸🇦 🇪🇬",
  "Bengali - বাংলা 🇧🇩",
  "Portuguese - Português 🇵🇹 🇧🇷",
  "Russian - Русский 🇷🇺",
  "Japanese - 日本語 (にほんご) 🇯🇵",
  "German - Deutsch 🇩🇪",
  "French - Français 🇫🇷",
  "Urdu - اردو 🇵🇰",
  "Italian - Italiano 🇮🇹",
  "Korean - 한국어 🇰🇷",
  "Turkish - Türkçe 🇹🇷",
  "Vietnamese - Tiếng Việt 🇻🇳",
  "Persian (Farsi) - فارسی 🇮🇷",
  "Polish - Polski 🇵🇱",
  "Dutch - Nederlands 🇳🇱",
  "Indonesian - Bahasa Indonesia 🇮🇩",
];