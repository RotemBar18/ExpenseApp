import React, { useState } from 'react';
import ReportsList from '../components/ReportsList';
import styled from 'styled-components';
import CreateReportModal from '../components/CreateReportModal';

const PageContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.background}; 
`;

const ReportsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  background-color: ${(props) => props.theme.background}; 
`;

const Button = styled.button`
  padding: 10px;
  width: 100%;
  font-size: 3rem;
  color: ${(props) => props.theme.buttonTextColor};
  background-color: ${(props) => props.theme.buttonBackground};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
opacity:0.8;
  }
 @media (max-width: 768px) {
  font-size: 2rem;

  }

`;

const ReportsPage = () => {
    const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);

    const handleOpenCreateReport = () => {
        setIsCreateReportOpen(true);
    };

    const handleCloseCreateReport = () => {
        setIsCreateReportOpen(false);
    };

    return (
        <PageContainer>
            <ReportsContainer>

                <Button onClick={handleOpenCreateReport}>&#43; Create Report &#43; 
                </Button>
                {isCreateReportOpen && <CreateReportModal onClose={handleCloseCreateReport} />}
                <ReportsList />

            </ReportsContainer>

        </PageContainer>
    );
};

export default ReportsPage;
