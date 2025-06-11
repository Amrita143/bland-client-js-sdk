import { BlandWebClient } from '../../dist/lib/es6/index.js';

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const transcriptEl = document.getElementById('transcripts');

let client = null;
let transcripts = [];

startBtn.addEventListener('click', async () => {
  startBtn.disabled = true;
  const resp = await fetch('/token');
  const data = await resp.json();
  if (data.error) {
    alert('Failed to fetch token: ' + data.error);
    startBtn.disabled = false;
    return;
  }
  client = new BlandWebClient(data.agentId, data.token);
  client.on('transcripts', tx => {
    if (tx && tx.text) {
      transcripts.push(tx);
      transcriptEl.textContent = transcripts.map(t => `${t.type === 'user' ? 'User' : 'Agent'}: ${t.text}`).join('\n');
    }
  });
  client.on('error', err => console.error('client error', err));
  await client.initConversation({ sampleRate: 44100 });
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  if (client) {
    client.stopConversation();
  }
  stopBtn.disabled = true;
  startBtn.disabled = false;
});
