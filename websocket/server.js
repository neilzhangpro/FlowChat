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
    //handle message
    ws.on('message', async(message) => {
        console.log('Received message:', message);
        try {
            const msg = JSON.parse(message);
            if(msg.type === 'user'){
                console.log('Received user message:', msg.data);
                await habdleUserMessage(ws, msg.data);
            }
        }catch(err){
            console.log('Error parsing message:', err);
            ws.send(JSON.stringify({
                type: 'error',
                data: {
                    message: 'Invalid message format',
                }
            }))
        }
    })
});

//handle user message
const habdleUserMessage = async (ws,messageData) => {
    console.log('Handling user message:', messageData);
    const AI_RESPONSES = [
        "我理解你的问题，让我来为你详细分析一下这个话题。首先，我们需要从基础概念开始理解，然后逐步深入到更复杂的层面。",
        "这是一个很有趣的问题！根据我的分析，我们可以从几个不同的角度来考虑这个问题。让我为你逐一解释每个要点。",
        "你提到的这个话题确实值得深入探讨。我建议我们先从理论基础开始，然后结合实际应用来分析具体的解决方案。",
        "基于你的问题，我认为最重要的是要理解背后的原理和逻辑。让我为你详细介绍相关的概念和实际应用场景。",
    ];
    const aiRes = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
    //stream response
    ws.send(JSON.stringify({
        type: 'stream_start',
        data: {
            id: Date.now().toString(),
            content: '',
            timestamp: new Date().toISOString(),
        }
    }))
    //mock delay
    await new Promise(resolve => setTimeout(resolve,(3000+Math.random()*100)));
    //stream response
    for(let i = 0; i < aiRes.length; i++){
        console.log('Sending stream chunk:', aiRes[i]);
        ws.send(JSON.stringify({
            type: 'stream_chunk',
            data: {
                id: Date.now().toString(),
                content: aiRes[i],
                timestamp: new Date().toISOString(),
            }
        }));
        //mock delay
        await new Promise(resolve => setTimeout(resolve,(30+Math.random()*100)));
    }
    //end stream
    ws.send(JSON.stringify({
        type: 'stream_end',
        data: {
            id: Date.now().toString(),
            content: aiRes,
            timestamp: new Date().toISOString(),
        }
    }))
    console.log('Stream response sent');
    console.log(aiRes)
}


wss.on('close', () => {
    console.log('Client disconnected');
});

wss.on('message', (message) => {
    console.log('Received message:', message);
});

wss.on('error', (error) => {
    console.error('WebSocket error:', error);
});