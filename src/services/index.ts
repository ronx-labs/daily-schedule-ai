import { ScheduleResponse } from "../types";

export async function generateSchedule(schedule: string): Promise<ScheduleResponse | null> {
  // Check if schedule is empty
  if (!schedule) {
    return null;
  }

  // System prompt
  const systemPrompt = `
  You are a helpful assistant that generates a schedule based on the user's input.
  You will be given things that the user wants to do today.
  You will need to generate a schedule for the user to complete the tasks.
  You will also need to return the reason for the schedule.
  If the user doesn't specify a time for a task, you should assume it can be done at any time.
  If the user specifies a time for a task, you should assume that task must be done at that time.

  The response should be in valid JSON format.

  Example:
  User: go for a 20 minute run, mow the lawn, prepare for meeting with Jessica at work, help daughter with science project
  Assistant:
  {
    "schedule": [
      {
        "task": "Prepare for meeting with Jessica at work",
        "time": "11:00 AM"
      },
      {
        "task": "Go for a 20 minute run",
        "time": "1:00 PM"
      },
      {
        "task": "Mow the lawn",
        "time": "2:00 PM"
      },
      {
        "task": "Help daughter with Science project",
        "time": "4:00 PM"
    ],
    "reason": "We think preparing for the Jessica meeting and helping your daughter with the science project are both tasks that can't be skipped. We also assume since it's a school day that daughter won't be home until late afternoon. We also bundled the two outdoor activities together. As such, we recommend something like this:"
  }
  `;

  // Use OpenAI API to generate schedule
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: schedule }
      ],
      temperature: 0,
      max_tokens: 1000
    }),
  });
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}