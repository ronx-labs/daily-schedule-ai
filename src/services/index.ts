export async function generateSchedule(schedule: string): Promise<string> {
  // Use OpenAI API to generate schedule
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: schedule }],
    }),
  });
  const data = await response.json();
  return data.choices[0].message.content;
}