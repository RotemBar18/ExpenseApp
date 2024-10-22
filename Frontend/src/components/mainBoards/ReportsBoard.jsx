import React, { useState } from 'react';
import ReportsList from '../report/ReportsList';
import styled from 'styled-components';
import CreateReportModal from '../report/CreateReportModal';

const ReportsBoardContainer = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
  height:100%;
`;

const Header = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size:1.8rem;
  font-weight:600;
`;

const Head = styled.div`
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content:space-between;
`;


const Button = styled.button`
  width: 20%;
  border-radius:5px;
  font-size: 1rem;
  color: ${(props) => props.theme.buttonTextColor};
  background-color: ${(props) => props.theme.buttonBackground};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height:2rem;
  &:hover {
  opacity:0.8;
  }

 @media (max-width: 990px) {
  height:3rem;
  } 
  @media (max-width: 768px) {
  font-size: 0.8rem;
  height:2rem;
  }
  @media (max-width: 370px) {
  font-size: 0.8rem;
  height:4rem;
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
        <ReportsBoardContainer>
            <Header>
                <Head>
                    Reports Board
                    <Button
                        onClick={handleOpenCreateReport}>&#43; Create Report &#43;
                    </Button>
                </Head>

            </Header>
            <ReportsList />

            {isCreateReportOpen && <CreateReportModal onClose={handleCloseCreateReport} />}

        </ReportsBoardContainer>
    );
};

export default ReportsPage;
