// src/components/ReportsList.jsx 
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserReports, deleteExistingReport } from '../redux/actions/reportsActions'; // Import actions
import useAuth from '../hooks/useAuth';
import Report from './Report'; // Import the Report component
const ReportsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
    justify-content: flex-start;
  gap: 20px;
  height:100%;
  background-color: ${(props) => props.theme.background};
`;

const ReportsList = () => {
  const dispatch = useDispatch();
  const { userId, token } = useAuth(); // Fetch userId and token from auth hook
  const reports = useSelector((state) => state.reports.reports); // Adjust based on your Redux state structure

  useEffect(() => {
    dispatch(fetchUserReports(userId, token));
  }, [dispatch, userId, token]);

  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      dispatch(deleteExistingReport(userId, reportId, token));
    }
  };

  console.log('Reports fetched from Redux:', reports); // Log to verify the reports array

  return (
    <ReportsContainer>
      {reports.length === 0 ? (
        <p>No reports available. Create one to see it here!</p>
      ) : (
        reports.map((report, index) => (
          <Report
            key={`${report.ReportId}-${index}`} // Use a combination of ReportId and index as a fallback
            report={report}
            onDelete={() => handleDeleteReport(report.ReportId)}
          />
        ))
      )}
    </ReportsContainer>
  );
};

export default ReportsList;