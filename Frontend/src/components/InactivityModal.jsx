import React from 'react';
import styled from 'styled-components';
import { LogOut } from 'lucide-react';  // Using an icon similar to what you showed

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  width: 400px;
  max-width: 90%;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  font-family: Arial, sans-serif;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
`;

const IconWrapper = styled.div`
  background: #fce4e4;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px auto;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const ModalMessage = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 10px 0 20px;
`;

const ActionButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }
`;

const InactivityModal = ({ onClose }) => (
  <Overlay>
    <ModalContainer>
      <CloseButton onClick={onClose}>✕</CloseButton>
      <IconWrapper>
        <LogOut color="#e74c3c" size={30} />
      </IconWrapper>
      <ModalTitle>Session Expired</ModalTitle>
      <ModalMessage>For your security, you've been logged out due to inactivity.</ModalMessage>
      <ModalMessage>Please log in again to continue.</ModalMessage>
      <ActionButton onClick={onClose}>Go to Login</ActionButton>
    </ModalContainer>
  </Overlay>
);

export default InactivityModal;
