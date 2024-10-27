import React, { useEffect, useState, memo } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for the fade in and fade out animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(20px); }
`;

// Container for the alert messages
const AlertsContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 3000;
  cursor: default;
    &:hover {
    filter: brightness(0.9); /* Slightly darken all child elements */
  }
`;

// Styles for individual alerts using theme attributes
const AlertBox = styled.div`
  background-color: ${(props) => props.theme.alertBg};
  color: ${(props) => props.theme.alertText};
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  font-size: 1rem;
  position: relative;
  animation: ${(props) => (props.isFadingOut ? fadeOut : fadeIn)} 1s ease forwards;
  max-width: 350px;
  border: 1px solid ${(props) => props.theme.alertBorder};
  transition: transform 0.3s ease; /* Smooth transform for hover effect */
`;

// Close button for dismissing the alert manually
const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.alertText};
  font-size: 0.9rem;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

// The main component for handling and displaying alerts
const AlertsModal = memo(({ alerts, removeAlert }) => {
  const [fadingOutAlerts, setFadingOutAlerts] = useState([]);
  const [timers, setTimers] = useState({});

  // Start a timer for each alert to initiate fade-out after 3 seconds
  const startTimer = (alertId) => {
    const fadeTimer = setTimeout(() => {
      setFadingOutAlerts((prev) => [...prev, alertId]); // Start fade-out
    }, 1500);

    const removeTimer = setTimeout(() => {
      removeAlert(alertId); // Remove the alert after fade-out completes
    }, 2000);

    setTimers((prevTimers) => ({
      ...prevTimers,
      [alertId]: { fadeTimer, removeTimer },
    }));
  };

  // Clears timers for fade-out and removal when hovered
  const clearTimers = (alertId) => {
    if (timers[alertId]) {
      clearTimeout(timers[alertId].fadeTimer);
      clearTimeout(timers[alertId].removeTimer);
    }
  };

  useEffect(() => {
    alerts.forEach((alert) => {
      startTimer(alert.id);
    });

    return () => {
      // Cleanup all timers when the component unmounts
      Object.values(timers).forEach(({ fadeTimer, removeTimer }) => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      });
    };
  }, [alerts]);

  return (
    <AlertsContainer>
      {alerts.map((alert) => (
        <AlertBox
          key={alert.id}
          isFadingOut={fadingOutAlerts.includes(alert.id)}
          onMouseEnter={() => clearTimers(alert.id)}
          onMouseLeave={() => startTimer(alert.id)} // Restart timer after hover
        >
          {alert.message}
          <CloseButton onClick={() => removeAlert(alert.id)}>✕</CloseButton>
        </AlertBox>
      ))}
    </AlertsContainer>
  );
});

export default AlertsModal;
