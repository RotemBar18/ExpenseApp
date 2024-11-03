import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoardReports, deleteExistingReport } from '../../redux/actions/reportsActions';
import useAuth from '../../hooks/useAuth';
import Report from './Report';

const ReportsContainer = styled.div`
  margin: 20px;
  display: flex;
  padding-right:10px;
  flex-direction:column;
  background-color: ${(props) => props.theme.background};
  overflow-y:auto;
&::-webkit-scrollbar {
  width: 8px;
}

&::-webkit-scrollbar-track {
  background: ${(props) => props.theme.scrollBarTrack};
  border-radius: 10px;
  
  
}

&::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.scrollBarThumb};
  border-radius: 10px;
  
}

&::-webkit-scrollbar-thumb:hover {
  background: ${(props) => props.theme.scrollBarThumbHover || props.theme.scrollBarThumb};
  cursor: pointer;
}
`;


const ReportsList = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const reports = useSelector((state) => state.reports.reports);
  const board = useSelector((state) => state.board.selectedBoard);
  const boardId = board.ExpenseBoardId
  
  useEffect(() => {
    dispatch(fetchBoardReports(boardId, token));
  }, [dispatch, boardId, token]);

  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      dispatch(deleteExistingReport(boardId, reportId, token));
    }
  };


  return (
    <ReportsContainer>
      {reports.length === 0 ? (
        <p>No reports available. Create one to see it here!</p>
      ) : (
        reports.map((report, index) => (
          <Report
            key={`${report.ReportId}-${index}`}
            report={report}
            onDelete={() => handleDeleteReport(report.ReportId)}
          />
        ))
      )}
    </ReportsContainer>
  );
};

export default ReportsList;
