import React, { useState, useEffect } from 'react';
import AlertsModal from '../components/AlertsModal';
import { initWebSocket } from '../utils/websocketClient';
import { v4 as uuidv4 } from 'uuid'; // For generating unique alert IDs
import { useSelector } from 'react-redux';
import useExpenses from '../hooks/useExpenses';
import useAuth from '../hooks/useAuth';
import useCollaborators from '../hooks/useCollaborators';

const WebSocketClient = () => {
  const [alerts, setAlerts] = useState([]);
  const selectedBoard = useSelector((state) => state.board.selectedBoard);
  const { reloadExpenses } = useExpenses({ boardId: selectedBoard?.ExpenseBoardId });
  const { reloadCollaborators } = useCollaborators({ selectedBoard })
  const {token} = useAuth()
  useEffect(() => {
    initWebSocket(addAlert, reloadExpenses, reloadCollaborators,selectedBoard.ExpenseBoardId,token);
  }, []);

  // Function to add an alert
  const addAlert = (message) => {
    const newAlert = { id: uuidv4(), message };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  // Function to remove an alert after 5 seconds or when close button is clicked
  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return <AlertsModal alerts={alerts} removeAlert={removeAlert} />;
};

export default WebSocketClient;
