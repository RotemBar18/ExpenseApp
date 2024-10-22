import React from 'react';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  width: 100%;
`;

const CollaboratorImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #00A86B;
`;

const CollaboratorDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CollaboratorName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const CollaboratorEmail = styled.p`
  font-size: 0.9rem;
  color: #555;
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const CloseButton = styled.button`
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const Text = styled.span`
  font-size: 1rem;
`;

const CollaboratorCard = ({ board, collaborator, onRemove, onClose }) => {
    const { user } = useAuth(); 

    const onRemoveBtn = (collaborator) => {
        onRemove(collaborator);
        onClose();
    };

    const handleClose = (e) => {
        e.stopPropagation();
        onClose();
    };

    const shouldRenderRemoveButton =
        user.Id === board.OwnerId || user.Id === collaborator.UserId;

    return (
        <ModalBackground onClick={handleClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CollaboratorImage
                    src={collaborator.ProfilePic || '/default_profile.png'}
                    alt={collaborator.Name}
                />
                <CollaboratorDetails>
                    <CollaboratorName>{collaborator.Name}</CollaboratorName>
                    <CollaboratorEmail>{collaborator.Email}</CollaboratorEmail>
                </CollaboratorDetails>

                {shouldRenderRemoveButton && (
                    <RemoveButton onClick={() => onRemoveBtn(collaborator)}>
                        {user.Id === collaborator.UserId ? (
                            <Text>Remove Myself</Text>
                        ) : (
                            <Text>Remove {collaborator.Name}</Text>
                        )}
                    </RemoveButton>
                )}

                <CloseButton onClick={onClose}>Close</CloseButton>
            </ModalContent>
        </ModalBackground>
    );
};

export default CollaboratorCard;
