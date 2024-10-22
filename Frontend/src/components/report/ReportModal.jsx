import React from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.modalBackground};
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h2`
  margin-top: 0;
  text-align: center;
  color: ${(props) => props.theme.modalTextColor};
`;

const ExpenseList = styled.ul`
  list-style: none;
  padding: 0;
  padding-right:20px;
  margin: 20px 0;
  max-height: 300px;
  overflow-y: auto;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollBarThumb};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.scrollBarTrack};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.scrollBarThumb};
    opacity: 0.8;
  }
`;
const ExpenseItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: ${(props) => props.theme.modalTextColor};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonTextColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;

const ReportModal = ({ report, onClose }) => {
  const parsedCategories = JSON.parse(report.Categories);
  const parsedMonths = JSON.parse(report.Months);
  const parsedYears = JSON.parse(report.Years);
  const parsedReportData = JSON.parse(report.ReportData);

  const totalAmount = parsedReportData.reduce((total, expense) => total + parseFloat(expense.Amount), 0);

  const exportToExcel = () => {
    const formattedData = parsedReportData.map((expense) => ({
      Name: expense.Name,
      Amount: parseFloat(expense.Amount).toFixed(2),
      Category: expense.Category,
      Date: format(new Date(expense.Date), 'dd/MM/yyyy'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, `${report.ReportName}.xlsx`);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>{report.ReportName} Summary</ModalHeader>
        <h4>Categories: {parsedCategories.join(', ')}</h4>
        <h4>Months: {parsedMonths.join(', ')}</h4>
        <h4>Years: {parsedYears.join(', ')}</h4>
        <ExpenseList>
          {parsedReportData.map((expense) => (
            <ExpenseItem key={expense.ExpenseId}>
              <span>{expense.Name}</span>
              <span>${parseFloat(expense.Amount).toFixed(2)}</span>
            </ExpenseItem>
          ))}
        </ExpenseList>
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
        <ButtonGroup>
          <Button onClick={exportToExcel}>Export to Excel</Button>
          <Button onClick={printReport}>Print</Button>
          <Button onClick={onClose}>Close</Button>
        </ButtonGroup>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default ReportModal;
