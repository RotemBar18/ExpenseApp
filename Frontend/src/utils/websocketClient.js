import { v4 as uuidv4 } from 'uuid';

let socket = null;
let addAlertCallback = null;
let activeAlerts = new Set();  // Track active alerts to prevent duplicates

export const initWebSocket = (addAlert, boardId, reloadExpenses) => {
  addAlertCallback = addAlert;
  // Check if WebSocket is already open
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => console.log('WebSocket connected');
    socket.onclose = () => console.log('WebSocket closed');
    socket.onerror = (error) => console.error('WebSocket error:', error);

    // Listen for incoming WebSocket messages
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleIncomingMessage(data, reloadExpenses, boardId);
    };
  }
};

const handleIncomingMessage = (data, reloadExpenses, boardId) => {
  let message;
  switch (data.type) {
    case 'joinBoard':
      message = `${data.user.Name} has joined the board ${data.board.Name}`;
      break;
    case 'addExpense':
      message = `${data.user.Name} added a new expense: ${data.expense.Name} that costs: ${data.expense.Amount}`;
      break;
    case 'addCollaborator':
      message = `${data.user.Name} added a new collaborator: ${data.collaborator.Name}`;
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
  if (data.type === 'addExpense') {
    reloadExpenses(boardId);
  }
};

// Function to send a joinBoard message
export const sendJoinBoardMessage = (user, board) => {
  const message = {
    type: 'joinBoard',
    user,
    board,
  };
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not open');
  }
};

export const sendAddExpenseMessage = (user, expense, board) => {
  const message = {
    type: 'addExpense',
    user,
    board,
    expense,
  };
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not open');
  }
};

export const sendAddCollaboratorMessage = (user, collaborator, board) => {
  const message = {
    type: 'addCollaborator',
    user,
    board,
    collaborator,
  };
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not open');
  }
};
