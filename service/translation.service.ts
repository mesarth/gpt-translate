export type TranslationResponse = {
  message?: string,
  error?: string
}

export async function translate(input: string, to: string): Promise<TranslationResponse> {
  console.log(process.env.EXPO_PUBLIC_API_URL);
  return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/translate`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({input, to})
  })
  .then(res => res.json())
  .then(res => res as TranslationResponse)
  .catch(err => ({error: err}));
}