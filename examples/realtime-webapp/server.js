const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const AGENT_ID = process.env.AGENT_ID;
const API_KEY = process.env.BLAND_API_KEY;

const app = express();
app.use(express.static(__dirname));

app.get('/token', async (req, res) => {
  if (!AGENT_ID || !API_KEY) {
    res.status(500).json({ error: 'Missing AGENT_ID or BLAND_API_KEY env vars' });
    return;
  }
  try {
    const response = await fetch(`https://api.bland.ai/v1/agents/${AGENT_ID}/authorize`, {
      method: 'POST',
      headers: { 'Authorization': API_KEY }
    });
    const data = await response.json();
    res.json({ token: data.token, agentId: AGENT_ID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
