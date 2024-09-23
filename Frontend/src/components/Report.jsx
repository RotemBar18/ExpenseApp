import React, { useState } from 'react';
import styled from 'styled-components';
import ReportModal from './ReportModal'; // Import the ReportModal component

const ReportCard = styled.div`
  background: ${(props) => props.theme.modalBackground};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 20%;
  text-align: center;
  position: relative;
`;

const ReportTitle = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.headerTextColor };
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Btns = styled.div`
margin-top:20px;
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const Button = styled.button`
  border: none;
  
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => props.theme.buttonBackground };
  color: ${(props) => props.theme.buttonTextColor };
  padding: 10px 15px;

  &:hover {
    opacity: 0.8;
  }
`;

const ViewReportButton = styled.button`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.buttonBackground };
  color: ${(props) => props.theme.buttonTextColor };
  border: none;
  border-radius: 5px;
  cursor: pointer;

 &:hover {
    opacity: 0.8;
  }
`;

const Report = ({ report, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleViewReport = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ReportCard>
        <ReportTitle>{report.ReportName}</ReportTitle>
        <Btns>
          <ViewReportButton onClick={handleViewReport}>Open</ViewReportButton>
          <Button onClick={onDelete}>Delete</Button>
        </Btns>
      </ReportCard>

      {isModalOpen && <ReportModal report={report} onClose={handleCloseModal} />}
    </>
  );
};

export default Report;
