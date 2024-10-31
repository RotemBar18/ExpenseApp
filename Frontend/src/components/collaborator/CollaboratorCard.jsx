import React from 'react';
import styled, { keyframes } from 'styled-components';
import useAuth from '../../hooks/useAuth';

const fadeInSlideDown = keyframes`
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalContent = styled.div`
  background-color: #f8f9fa;
  padding: 25px 30px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  width: 90%;
  animation: ${fadeInSlideDown} 0.4s ease-out;
  /* Adjust padding and width for smaller screens */
  @media (max-width: 600px) {
    padding: 20px;
    max-width: 90%;
  }
`;

const CollaboratorImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 3px solid #1abc9c;
  /* Smaller image size for mobile */
  @media (max-width: 600px) {
    width: 70px;
    height: 70px;
  }
`;

const CollaboratorName = styled.h3`
  margin: 10px 0 5px;
  font-size: 1.6rem;
  color: #2c3e50;
  font-weight: 600;
  text-align: center;
  /* Adjust font size for mobile */
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const CollaboratorEmail = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin: 0;
  text-align: center;
  /* Adjust font size for mobile */
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
  max-width: 200px;
  transition: background-color 0.3s ease;
  /* Adjust padding and font size for mobile */
  @media (max-width: 600px) {
    padding: 8px 12px;
    font-size: 0.9rem;
    max-width: 160px;
  }
`;

const RemoveButton = styled(Button)`
  background-color: #e74c3c;
  color: #fff;
  &:hover {
    background-color: #c0392b;
  }
`;

const CloseButton = styled(Button)`
  background-color: #95a5a6;
  color: #fff;
  &:hover {
    background-color: #7f8c8d;
  }
`;

const CollaboratorCard = ({ board, collaborator, onRemove, onClose }) => {
  const { user } = useAuth();

  const onRemoveBtn = () => {
    onRemove(collaborator);
    onClose();
  };

  const onCloseBtn = (e) => {
    e.stopPropagation()
    onClose();
  };

  const shouldRenderRemoveButton = user.Id === board.OwnerId || user.Id === collaborator.UserId;

  return (
    <ModalBackground onClick={(e) => onCloseBtn(e)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CollaboratorImage
          src={collaborator.ProfilePic || '/default_profile.png'}
          alt={collaborator.Name}
        />
        <CollaboratorName>{collaborator.Name}</CollaboratorName>
        <CollaboratorEmail>{collaborator.Email}</CollaboratorEmail>

        {shouldRenderRemoveButton && (
          <RemoveButton onClick={onRemoveBtn}>
            {user.Id === collaborator.UserId ? "Remove Myself" : `Remove ${collaborator.Name}`}
          </RemoveButton>
        )}

        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalBackground>
  );
};

export default CollaboratorCard;
