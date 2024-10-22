import React, { useState } from 'react';
import styled from 'styled-components';
import ReportModal from './ReportModal';
import { Calendar, DollarSign, Trash2, ArrowUpRight, Tag } from 'lucide-react';


const ReportTitle = styled.h3`
  color: ${(props) => props.theme.headerTextColor};
  font-size: 1.2em;
  margin: 5px;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
  font-size: 0.8rem;
`;

const IconWrapper = styled.div`
  margin-right: 8px;
  color: ${(props) => props.theme.iconColor};
`;


const TotalAmount = styled.div`
  display: flex;
  flex-direction:row;
  font-size: 1rem;
  font-weight: bold;
  justify-content: flex-start;
  color: ${(props) => props.theme.successColor};
`;
const ReportCard = styled.div`
  background: ${(props) => props.theme.modalBackground};
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative; /* Make the parent relative */
`;

const ButtonGroup = styled.div`
  position: absolute; /* Absolutely position the buttons */
  bottom: 10px; /* Adjust the distance from the bottom */
  right: 10px; /* Adjust the distance from the right */
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonTextColor};
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;

const ViewReportButton = styled(Button)`
  background-color: ${(props) => props.theme.viewButtonBackground};
  color: ${(props) => props.theme.viewButtonTextColor};

  &:hover {
    background-color: ${(props) => props.theme.viewButtonHoverBackground};
  }
`;

const DeleteButton = styled(Button)`
  background-color: ${(props) => props.theme.deleteButtonBackground};
  color: ${(props) => props.theme.deleteButtonTextColor};

  &:hover {
    background-color: ${(props) => props.theme.deleteButtonHoverBackground};
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

  const parsedCategories = JSON.parse(report.Categories);
  const parsedMonths = JSON.parse(report.Months);

  const totalAmount = JSON.parse(report.ReportData).reduce(
    (total, expense) => total + parseFloat(expense.Amount),
    0
  );

  return (
    <>
      <ReportCard>
        <div>
          <ReportTitle>{report.ReportName}</ReportTitle>

          <DetailRow>
            <IconWrapper>
              <Calendar size={20} />
            </IconWrapper>
            <span>{parsedMonths.length} months: {parsedMonths.join(', ')}</span>
          </DetailRow>

          <DetailRow>
            <IconWrapper>
              <Tag size={20} />
            </IconWrapper>
            <span>Categories: {parsedCategories.join(', ')}</span>
          </DetailRow>
          
            <TotalAmount>
              <IconWrapper>
                <DollarSign size={24} />
              </IconWrapper>
              {totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </TotalAmount>
            <ButtonGroup>
              <ViewReportButton onClick={handleViewReport}>
                View Report <ArrowUpRight size={18} style={{ marginLeft: '8px' }} />
              </ViewReportButton>
              <DeleteButton onClick={onDelete}>
                <Trash2 size={18} />
                Delete
              </DeleteButton>
            </ButtonGroup>

        </div>


      </ReportCard>

      {isModalOpen && <ReportModal report={report} onClose={handleCloseModal} />}
    </>
  );
};

export default Report;
