# Realtime Bland Voice Webapp Example

This example demonstrates a simple browser interface that connects to a Bland AI Voice agent. Microphone access is requested from the user and transcripts for both sides of the conversation are displayed in realtime.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Provide your secrets as environment variables when running the server:

- `BLAND_API_KEY` – your Bland API authorization key
- `AGENT_ID` – the id of the voice agent you want to connect to

## Running

Start the local server with:

```bash
node server.js
```

The application will be available at [http://localhost:3000](http://localhost:3000).

Click **Start Call** to initialize the conversation and **End Call** to stop it. New transcript lines will appear in the interface as they are received.
