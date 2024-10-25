import { v4 as uuidv4 } from 'uuid';

let socket = null;
let addAlertCallback = null;
let activeAlerts = new Set();  // Track active alerts to prevent duplicates

export const initWebSocket = (addAlert, reloadExpenses, reloadCollaborators, boardId) => {
  addAlertCallback = addAlert;
  // Check if WebSocket is already open
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(`wss://neon-long-octagon.glitch.me?boardId=${boardId}`);
    socket.onopen = () => console.log(`WebSocket connected to board ${boardId}`);
    socket.onclose = () => {
      console.log('WebSocket closed');
      socket = null;  // Clear the socket reference on close
    };
    socket.onerror = (error) => console.error('WebSocket error:', error);
    
    // Listen for incoming WebSocket messages
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleIncomingMessage(data, reloadExpenses, reloadCollaborators,boardId);
    };
  }
};

// Function to disconnect WebSocket
export const disconnectWebSocket = () => {
  if (socket) {
    socket.close(); // Close the WebSocket connection
    socket = null;  // Clear the socket reference
    console.log('WebSocket disconnected');
  }
};

// Helper function to wait until the WebSocket is open
const waitForSocketConnection = () => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject('WebSocket is not initialized');
      return;
    }
    if (socket.readyState === WebSocket.OPEN) {
      resolve();
    } else {
      socket.onopen = () => {
        console.log('WebSocket connection opened');
        resolve();
      };
      socket.onerror = (error) => reject('WebSocket error:', error);
    }
  });
};

const handleIncomingMessage = (data, reloadExpenses, reloadCollaborators,boardId) => {
  let message;
  switch (data.type) {
    case 'joinBoard':
      message = `${data.userName} has joined the board ${data.boardName}`;
      break;
    case 'addExpense':
      message = `${data.userName} added a new expense: ${data.expenseName} that costs: ${data.expenseAmount}`;
      break;
    case 'removeExpense':
      message = `${data.userName} removed an expense:  ${data.expenseName} that costs: ${data.expenseAmount}`;
      break;
    case 'addCollaborator':
      message = `${data.userName} added a new collaborator: ${data.collaboratorName} to board ${data.boardName}`;
      break;
    case 'removeCollaborator':
      message = `${data.userName} removed a collaborator: ${data.collaboratorName} from board ${data.boardName}`;
      break;
    default:
      console.log('Unknown message type:', data.type);
      return;
  }

  // Only add alert if it's not already in the active alerts set
  if (!activeAlerts.has(message)) {
    activeAlerts.add(message);
    addAlertCallback(message);
    setTimeout(() => activeAlerts.delete(message), 5000); // Clear alert from activeAlerts after 5 seconds
  }
  
   if (data.type === 'addExpense' || data.type === 'removeExpense') {
    console.log(reloadExpenses)
    reloadExpenses(boardId);
  }
  // Reload expenses for the board
  if (data.type === 'addCollaborator' || data.type === 'removeCollaborator') {
    reloadCollaborators();
  }
};

export const sendJoinBoardMessage = async (user, board) => {
  const message = {
    type: 'joinBoard',
    userName: user.Name,   // Only send user name
    boardName: board.Name, // Only send board name
    boardId: board.ExpenseBoardId, // Send the boardId
  };

  try {
    await waitForSocketConnection();  // Wait for WebSocket to be open
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
      console.log('joinBoard message sent');
    }
  } catch (error) {
    console.error('Failed to send joinBoard message:', error);
  }
};

export const sendAddExpenseMessage = (user, expense, board) => {
  const message = {
    type: 'addExpense',
    userName: user.Name,        // Only send user name
    boardName: board.Name,      // Only send board name
    expenseName: expense.Name,  // Only send expense name
    expenseAmount: expense.Amount,  // Only send expense name
    boardId: board.ExpenseBoardId, // Send the boardId
  };

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
};

export const sendRemoveExpenseMessage = (user, expense, board) => {
  const message = {
    type: 'removeExpense',
    userName: user.Name,        // Only send user name
    boardName: board.Name,      // Only send board name
    expenseName: expense.Name,  // Only send expense name
    expenseAmount: expense.Amount, // Only send expense name
    boardId: board.ExpenseBoardId, // Send the boardId
  };

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
};

export const sendAddCollaboratorMessage = (user, collaborator, board) => {
  const message = {
    type: 'addCollaborator',
    userName: user.Name,             // Only send user name
    boardName: board.Name,           // Only send board name
    collaboratorName: collaborator.Name, // Only send collaborator name
    boardId: board.ExpenseBoardId, // Send the boardId
  };

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
};

export const sendRemoveCollaboratorMessage = (user, collaborator, board) => {
  const message = {
    type: 'removeCollaborator',
    userName: user.Name,             // Only send user name
    boardName: board.Name,           // Only send board name
    collaboratorName: collaborator.Name, // Only send collaborator name
    boardId: board.ExpenseBoardId, // Send the boardId
  };

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
};
