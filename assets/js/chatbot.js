const API_KEY = 'YOUR_OPENAI_API_KEY';
const messages = [];

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  messages.push({ role: 'user', content: text });
  input.value = '';
  updateChatLog();

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages
      })
    });
    const data = await response.json();
    const reply = data.choices && data.choices[0].message.content.trim();
    if (reply) {
      messages.push({ role: 'assistant', content: reply });
      updateChatLog();
    }
  } catch (err) {
    messages.push({ role: 'assistant', content: 'Error: ' + err.message });
    updateChatLog();
  }
}

function updateChatLog() {
  const log = document.getElementById('chat-log');
  log.innerHTML = '';
  for (const m of messages) {
    const div = document.createElement('div');
    div.textContent = (m.role === 'user' ? 'You: ' : 'AI: ') + m.content;
    log.appendChild(div);
  }
  log.scrollTop = log.scrollHeight;
}

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});
