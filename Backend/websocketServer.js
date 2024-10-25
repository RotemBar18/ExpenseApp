const WebSocket = require('ws');

// Create a function to setup the WebSocket server
function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  // Function to broadcast messages to all connected clients
  function broadcastMessage(message, boardId) {
    const messageString = JSON.stringify(message);
    const messageSize = Buffer.byteLength(messageString, 'utf8'); // Calculate message size in bytes

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client.boardId === boardId) {
        console.log(`[Outbound WebSocket] Board ID: ${boardId}`);
        console.log(`[Message Size]: ${messageSize} bytes`); // Log the size of the message
        client.send(messageString);
      }
    });
  }

  // Handle WebSocket connections
  wss.on('connection', (ws) => {
    console.log('New WebSocket client connected');

    ws.on('message', (data) => {
      const parsedData = JSON.parse(data);

      switch (parsedData.type) {
        case 'joinBoard':
          // Save client details based on the data being sent
          ws.userName = parsedData.userName; // Only user name now
          ws.boardName = parsedData.boardName; // Only board name now
          // No boardId is sent now; this is just a placeholder unless you want to send it
          ws.boardId = parsedData.boardId; // Optionally send boardId separately

          // Broadcast the join event to other board collaborators, using only the names
          broadcastMessage({
            type: 'joinBoard',
            userName: parsedData.userName, // Only send user name
            boardName: parsedData.boardName, // Only send board name
            message: `${parsedData.userName} has joined the board ${parsedData.boardName}`,
          }, ws.boardId);
          break;

        case 'addExpense':
          // Broadcast the add expense event, using the reduced data
          broadcastMessage({
            type: 'addExpense',
            userName: parsedData.userName, // Only send user name
            boardName: parsedData.boardName, // Only send board name
            expenseName: parsedData.expenseName, // Only send expense name
            expenseAmount: parsedData.expenseAmount, // Only send expense name
            message: `${parsedData.userName} added a new expense: ${parsedData.expenseName} that costs: ${parsedData.expenseAmount}`,
          }, ws.boardId);
          break;

        case 'removeExpense':
          // Broadcast the remove expense event, using the reduced data
          broadcastMessage({
            type: 'removeExpense',
            userName: parsedData.userName, // Only send user name
            boardName: parsedData.boardName, // Only send board name
            expenseName: parsedData.expenseName, // Only send expense name
            expenseAmount: parsedData.expenseAmount, // Only send expense name
            message: `${parsedData.userName} removed an expense: ${parsedData.expenseName} that costs: ${parsedData.expenseAmount}`,
          }, ws.boardId);
          break;

        case 'addCollaborator':
          // Broadcast the add collaborator event, using the reduced data
          broadcastMessage({
            type: 'addCollaborator',
            userName: parsedData.userName, // Only send user name
            boardName: parsedData.boardName, // Only send board name
            collaboratorName: parsedData.collaboratorName, // Only send collaborator name
            message: `${parsedData.userName} added a new collaborator: ${parsedData.collaboratorName} to board ${parsedData.boardName}`,
          }, ws.boardId);
          break;

        case 'removeCollaborator':
          // Broadcast the remove collaborator event, using the reduced data
          broadcastMessage({
            type: 'removeCollaborator',
            userName: parsedData.userName, // Only send user name
            boardName: parsedData.boardName, // Only send board name
            collaboratorName: parsedData.collaboratorName, // Only send collaborator name
            message: `${parsedData.userName} removed a collaborator: ${parsedData.collaboratorName} from board ${parsedData.boardName}`,
          }, ws.boardId);
          break;

        default:
          console.log('Unknown message type:', parsedData.type);
          break;
      }
    });

    // Handle client disconnect
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
}

// Export the setup function to be used in server.js
module.exports = { setupWebSocketServer };
