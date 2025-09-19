import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    //send welcome message
    ws.send(JSON.stringify({
        type: 'welcome',
        data: {
            id: Date.now().toString(),
            content:'👋 Welcome to FlowChat! I am your AI assistant. How can I help you today?',
            timestamp: new Date().toISOString(),
        }
    }))
});

wss.on('close', () => {
    console.log('Client disconnected');
});

wss.on('message', (message) => {
    console.log('Received message:', message);
});

wss.on('error', (error) => {
    console.error('WebSocket error:', error);
});