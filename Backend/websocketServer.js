const WebSocket = require('ws');

// Create a function to setup the WebSocket server
function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  // Function to broadcast messages to all connected clients
  function broadcastMessage(message, boardId) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client.boardId === boardId) {
        client.send(JSON.stringify(message));
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
          // Save client details, including the board they joined
          ws.userId = parsedData.user.Id;
          ws.boardId = parsedData.board.ExpenseBoardId;

          // Broadcast the join event to other board collaborators
          broadcastMessage({
            type: 'joinBoard',
            user: parsedData.user,
            board: parsedData.board,
            message: `${parsedData.user.Name} has joined the board ${parsedData.board.Name}`,
          }, ws.boardId);
          break;

        case 'addExpense':
          // Broadcast the add expense event
          broadcastMessage({
            type: 'addExpense',
            user: parsedData.user,
            board: parsedData.board,
            expense: parsedData.expense,
            message: `${parsedData.user.Name} added a new expense: ${parsedData.expense.Name} that costs: ${parsedData.expense.Amount}`,
          }, ws.boardId);
          break;

        case 'removeExpense':
          // Broadcast the remove expense event
          broadcastMessage({
            type: 'removeExpense',
            user: parsedData.user,
            board: parsedData.board,
            expense: parsedData.expense,
            message: `${parsedData.user.Name} removed an expense: ${parsedData.expense.Name} that costs: ${parsedData.expense.Amount}`,
          }, ws.boardId);
          break;

          case 'addCollaborator':
            // Broadcast the add collaborator event
            broadcastMessage({
              type: 'addCollaborator',
              user: parsedData.user,
              board: parsedData.board,
              collaborator: parsedData.collaborator,
              message: `${parsedData.user.Name} added a new collaborator: ${parsedData.collaborator.Name} to: ${parsedData.board.Name}`,
            }, ws.boardId);
            break;

            case 'removeCollaborator':
              // Broadcast the add collaborator event
              broadcastMessage({
                type: 'removeCollaborator',
                user: parsedData.user,
                board: parsedData.board,
                collaborator: parsedData.collaborator,
                message: `${parsedData.user.Name} removed a collaborator: ${parsedData.collaborator.Name} from: ${parsedData.board.Name}`,
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
