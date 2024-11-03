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
   color: ${(props) => props.theme.buttonTextColor};
  background-color: ${(props) => props.theme.buttonBackground};
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.2s ease;
    border: none;
    padding: 1rem;
    cursor: pointer;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);



  &:hover {
  opacity:0.8;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 122, 255, 0.3);
  }

  &:disabled {
    background: #e0e0e0;
    color: #999;
    cursor: not-allowed;
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
