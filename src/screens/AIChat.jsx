import { useState, useRef, useEffect } from 'react'

const STARTER = {
  id: 'welcome',
  role: 'assistant',
  text: "Hi! I'm the LocAI Assistant 👋 I have real local knowledge about Lake Toba — ferry times, attractions, safety tips, and what to pack. What would you like to know?",
}

const SUGGESTIONS = [
  'How do I get from Medan to Lake Toba?',
  'Is it safe for solo travellers?',
  'What should I pack?',
]

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function BotIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="rgba(255,255,255,0.2)" />
      <circle cx="9" cy="10" r="1" fill="white" stroke="none" />
      <circle cx="12" cy="10" r="1" fill="white" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="white" stroke="none" />
    </svg>
  )
}

function SendIcon({ active }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active ? 'white' : '#9CA3AF'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22 11 13 2 9l20-7z" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
      <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
    </svg>
  )
}

function AIBubble({ text }) {
  return (
    <div className="flex items-end gap-2" style={{ maxWidth: '84%' }}>
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: 'linear-gradient(135deg, #0D7377, #14a085)' }}
      >
        <BotIcon />
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-bl-sm text-gray-700 text-[14px] leading-relaxed"
        style={{ background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}
      >
        {text}
      </div>
    </div>
  )
}

function UserBubble({ text }) {
  return (
    <div className="flex justify-end">
      <div
        className="px-4 py-3 rounded-2xl rounded-br-sm text-white text-[14px] leading-relaxed"
        style={{
          maxWidth: '78%',
          background: 'linear-gradient(135deg, #0D7377 0%, #14a085 100%)',
          boxShadow: '0 2px 10px rgba(13,115,119,0.3)',
        }}
      >
        {text}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: 'linear-gradient(135deg, #0D7377, #14a085)' }}
      >
        <BotIcon />
      </div>
      <div
        className="px-4 py-3.5 rounded-2xl rounded-bl-sm flex items-center gap-1.5"
        style={{ background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}
      >
        <span
          className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
          style={{ animationDelay: '0ms', animationDuration: '1s' }}
        />
        <span
          className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
          style={{ animationDelay: '180ms', animationDuration: '1s' }}
        />
        <span
          className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
          style={{ animationDelay: '360ms', animationDuration: '1s' }}
        />
      </div>
    </div>
  )
}

export default function AIChat({ guide, navigate }) {
  const [messages, setMessages] = useState([STARTER])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 350)
  }

  const send = async (quickText) => {
    const text = (quickText || input).trim()
    if (!text || loading) return

    setShowSuggestions(false)
    setInput('')
    const userMsg = { id: Date.now(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const history = [...messages, userMsg].map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text,
      }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', text: data.reply },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: "I couldn't connect right now. Please check your internet and try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const hasInput = input.trim().length > 0

  return (
    <div className="flex flex-col bg-[#FAF7F2]" style={{ height: '812px' }}>

      {/* ── Top bar ── */}
      <div
        className="shrink-0 bg-white px-4 pt-12 pb-4 flex items-center gap-3"
        style={{ boxShadow: '0 1px 0 #F0EDEA' }}
      >
        <button
          onClick={() => navigate(guide ? 'profile' : 'home')}
          className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 active:bg-gray-200 transition-colors duration-150"
        >
          <ChevronLeft />
        </button>

        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #0D7377, #14a085)' }}
        >
          <BotIcon />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-gray-900 text-[15px] font-bold leading-none">LocAI Assistant</p>
          <div className="flex items-center gap-1.5 mt-[5px]">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <p className="text-gray-400 text-[11px]">Online · Lake Toba local knowledge</p>
          </div>
        </div>
      </div>

      {/* ── Messages area ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-3 flex flex-col gap-3">
        {messages.map(msg =>
          msg.role === 'user'
            ? <UserBubble key={msg.id} text={msg.text} />
            : <AIBubble key={msg.id} text={msg.text} />
        )}

        {loading && <TypingIndicator />}

        {/* Quick-suggestion pills — shown until first user message */}
        {showSuggestions && !loading && (
          <div className="flex flex-col items-end gap-2 mt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-[13px] font-medium px-4 py-2 rounded-2xl border-2 transition-all duration-150 hover:bg-[#0D7377] hover:text-white hover:border-[#0D7377] active:scale-95"
                style={{ borderColor: '#0D7377', color: '#0D7377' }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input bar ── */}
      {/*
        shrink-0 keeps this pinned to the bottom of the flex column.
        When the mobile keyboard opens and the viewport shrinks, this bar
        stays at the visible bottom — no fixed positioning needed.
      */}
      <div
        className="shrink-0 bg-white px-4 pt-3 pb-6 flex items-center gap-2"
        style={{ boxShadow: '0 -1px 0 #F0EDEA' }}
      >
        {/* Mic — decorative for demo */}
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150">
          <MicIcon />
        </button>

        {/* Text input */}
        <div
          className="flex-1 flex items-center rounded-2xl px-4"
          style={{ background: '#F0EDEA' }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={scrollToBottom}
            placeholder="Ask about Lake Toba…"
            className="flex-1 bg-transparent py-3 text-[14px] text-gray-700 placeholder-gray-400 outline-none"
          />
        </div>

        {/* Send button */}
        <button
          onClick={() => send()}
          disabled={!hasInput || loading}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95 disabled:opacity-50"
          style={{
            background: hasInput && !loading
              ? 'linear-gradient(135deg, #0D7377, #14a085)'
              : '#E5E7EB',
            boxShadow: hasInput && !loading
              ? '0 2px 10px rgba(13,115,119,0.35)'
              : 'none',
          }}
        >
          <SendIcon active={hasInput && !loading} />
        </button>
      </div>

    </div>
  )
}
