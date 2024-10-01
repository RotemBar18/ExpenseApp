import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserReports, deleteExistingReport } from '../redux/actions/reportsActions';
import useAuth from '../hooks/useAuth';
import Report from './Report'; 

const ReportsContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  height:100%;
  align-content: flex-start;
  background-color: ${(props) => props.theme.background};
  
  @media (max-width: 768px) {
  justify-content: center;
  flex-wrap:nowrap;
  }

    @media (max-width: 550px) {
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
  }
  `;


const ReportsList = () => {
  const dispatch = useDispatch();
  const { userId, token } = useAuth();
  const reports = useSelector((state) => state.reports.reports); 

  useEffect(() => {
    dispatch(fetchUserReports(userId, token));
  }, [dispatch, userId, token]);

  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      dispatch(deleteExistingReport(userId, reportId, token));
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
