import { useState } from 'react';
import OpenAI from 'openai';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const client = new OpenAI();
      const response = await client.responses.create({
        model: 'gpt-4.1',
        input: input.trim(),
      });
      const reply = response.output_text;
      if (reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: ' + err.message }]);
    }
  };

  return (
    <div>
      <div id="chat-log" style={{ minHeight: '200px', marginBottom: '1rem' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: '0.5rem' }}>
            <strong>{m.role === 'user' ? 'You' : 'AI'}: </strong>{m.content}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          style={{ flexGrow: 1, marginRight: '0.5rem' }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
