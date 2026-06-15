import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Accept either { messages: [...] } for multi-turn or { message: '...' } for single-turn
  const { messages, message } = req.body

  if (!messages && !message) {
    return res.status(400).json({ error: 'messages or message is required' })
  }

  const knowledgePath = join(__dirname, '../src/knowledge/guide-knowledge.txt')
  const knowledge = readFileSync(knowledgePath, 'utf-8')

  const systemPrompt = `You are LocAI Assistant, a helpful AI guide for tourists visiting Lake Toba, Indonesia.
You answer questions using only the local knowledge provided below.
If you don't know the answer, say: "I don't have specific information on that — I recommend asking your guide directly or checking with the local tourism office."
Never make up prices, schedules, or locations. Keep responses concise and friendly.

--- LOCAL GUIDE KNOWLEDGE ---
${knowledge}
---`

  // Build message array — support both multi-turn and legacy single-message calls
  const conversationMessages = messages
    ? messages.map(m => ({ role: m.role, content: m.content }))
    : [{ role: 'user', content: message }]

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversationMessages,
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    return res.status(500).json({ error: 'OpenAI API error', details: error })
  }

  const data = await response.json()
  const reply = data.choices[0].message.content

  return res.status(200).json({ reply })
}
