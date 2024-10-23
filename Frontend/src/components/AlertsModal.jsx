import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for the fade in and fade out animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;

// Container for the alert messages
const AlertsContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

// Styles for individual alerts
const AlertBox = styled.div`
  background-color: white;
  color: #333;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  font-size: 1rem;
  position: relative;
  animation: ${fadeIn} 0.5s ease forwards, ${fadeOut} 0.5s ease 4.5s forwards;
  transition: transform 0.3s ease-out;
  max-width: 300px;
`;

// Close button for dismissing the alert manually
const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

// The main component for handling and displaying alerts
const AlertsModal = ({ alerts, removeAlert }) => {
  useEffect(() => {
    // Set up a timer to automatically remove alerts after 5 seconds
    const timers = alerts.map((alert, index) =>
      setTimeout(() => {
        removeAlert(alert.id); // Remove the alert after 5 seconds
      }, 5000)
    );
    // Cleanup timers on component unmount
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [alerts, removeAlert]);

  return (
    <AlertsContainer>
      {alerts.map((alert) => (
        <AlertBox key={alert.id}>
          {alert.message}
          <CloseButton onClick={() => removeAlert(alert.id)}>✕</CloseButton>
        </AlertBox>
      ))}
    </AlertsContainer>
  );
};

export default AlertsModal;
