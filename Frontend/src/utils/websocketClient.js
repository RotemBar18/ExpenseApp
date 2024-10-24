import { v4 as uuidv4 } from 'uuid';

let socket = null;
let addAlertCallback = null;
let activeAlerts = new Set();  // Track active alerts to prevent duplicates

export const initWebSocket = (addAlert, reloadExpenses, reloadCollaborators,boardId) => {
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
      handleIncomingMessage(data, reloadExpenses, reloadCollaborators);
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

const handleIncomingMessage = (data, reloadExpenses, reloadCollaborators) => {
  let message;
  switch (data.type) {
    case 'joinBoard':
      message = `${data.user.Name} has joined the board ${data.board.Name}`;
      break;
    case 'addExpense':
      message = `${data.user.Name} added a new expense: ${data.expense.Name} that costs: ${data.expense.Amount}`;
      break;
    case 'removeExpense':
      message = `${data.user.Name} removed an expense: ${data.expense.Name} that costs: ${data.expense.Amount}`;
      break;
    case 'addCollaborator':
      message = `${data.user.Name} added a new collaborator: ${data.collaborator.Name} to board ${data.board.Name}`;
      break;
    case 'removeCollaborator':
      message = `${data.user.Name} removed a collaborator: ${data.collaborator.Name} from board ${data.board.Name}`;
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
  
  // Reload expenses for the board
  if (data.type === 'addExpense' || data.type === 'removeExpense') {
    reloadExpenses();
  }
  if (data.type === 'addCollaborator' || data.type === 'removeCollaborator') {
    reloadCollaborators();
  }
};

// Function to send a joinBoard message
export const sendJoinBoardMessage = async (user, board) => {
  const message = {
    type: 'joinBoard',
    user,
    board,
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

export const sendAddExpenseMessage = async (user, expense, board) => {
  const message = {
    type: 'addExpense',
    user,
    board,
    expense,
  };
  try {
    await waitForSocketConnection();  // Wait for WebSocket to be open
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  } catch (error) {
    console.error('Failed to send addExpense message:', error);
  }
};

export const sendRemoveExpenseMessage = async (user, expense, board) => {
  const message = {
    type: 'removeExpense',
    user,
    board,
    expense,
  };
  try {
    await waitForSocketConnection();  // Wait for WebSocket to be open
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  } catch (error) {
    console.error('Failed to send removeExpense message:', error);
  }
};

export const sendAddCollaboratorMessage = async (user, collaborator, board) => {
  const message = {
    type: 'addCollaborator',
    user,
    board,
    collaborator,
  };
  try {
    await waitForSocketConnection();  // Wait for WebSocket to be open
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  } catch (error) {
    console.error('Failed to send addCollaborator message:', error);
  }
};

export const sendRemoveCollaboratorMessage = async (user, collaborator, board) => {
  const message = {
    type: 'removeCollaborator',
    user,
    board,
    collaborator,
  };
  try {
    await waitForSocketConnection();  // Wait for WebSocket to be open
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  } catch (error) {
    console.error('Failed to send removeCollaborator message:', error);
  }
};
