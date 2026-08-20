'use client'

import { useState } from 'react'
import { ArrowRight, Bot, MessageCircle, Send, X } from 'lucide-react'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const starters = ['My car will not start', 'Why is my brake making noise?', 'What does the check engine light mean?', 'My AC is not cooling', 'My car is overheating', 'I hear a strange engine noise', 'My car is vibrating', 'My battery keeps going flat']

export function CarDoctor() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Namaste. I am Amba Motors Car Doctor. Tell me what your car is doing, and I will help you choose the safest next step.' },
  ])

  async function sendMessage(value = input) {
    const text = value.trim()
    if (!text || loading) return
    const next = [...messages, { role: 'user' as const, content: text }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const response = await fetch('/api/car-doctor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next }) })
      if (!response.ok) throw new Error('Assistant unavailable')
      const data = await response.json() as { answer?: string; error?: string }
      if (!data.answer) throw new Error(data.error ?? 'Assistant returned no answer')
      setMessages([...next, { role: 'assistant', content: data.answer }])
    } catch {
      setMessages([...next, { role: 'assistant', content: 'I could not connect right now. Please call Amba Motors or message us on WhatsApp for immediate help.' }])
    } finally { setLoading(false) }
  }

  return <>
    <button className="car-doctor-launch" onClick={() => setOpen(true)} aria-label="Open Amba Motors Car Doctor"><Bot size={20} /><span>Car Doctor</span></button>
    {open && <div className="car-doctor-panel" role="dialog" aria-label="Amba Motors Car Doctor"><div className="car-doctor-head"><div><span className="tool-kicker">Amba Motors</span><h2>Car Doctor</h2></div><button onClick={() => setOpen(false)} aria-label="Close Car Doctor"><X size={19} /></button></div><div className="car-doctor-messages">{messages.map((message, index) => <div className={`car-doctor-message ${message.role}`} key={`${message.role}-${index}`}>{message.content || 'Thinking…'}</div>)}{messages.length === 1 && <div className="car-doctor-starters">{starters.map(starter => <button key={starter} onClick={() => sendMessage(starter)}>{starter}<ArrowRight size={14} /></button>)}</div>}</div><form className="car-doctor-input" onSubmit={event => { event.preventDefault(); sendMessage() }}><input value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about your car…" aria-label="Ask the Car Doctor" /><button type="submit" disabled={loading || !input.trim()} aria-label="Send question"><Send size={17} /></button></form><a className="car-doctor-whatsapp" href="https://wa.me/919822778899" target="_blank" rel="noreferrer"><MessageCircle size={15} /> Need a human? WhatsApp Amba Motors</a></div>}
  </>
}
