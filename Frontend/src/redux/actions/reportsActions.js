import {
    fetchReports,
    fetchReportById,
    createReport,
    updateReport,
    deleteReport,
  } from '../../utils/reportsService';
  
  export const fetchUserReports = (userId, token) => async (dispatch) => {
    dispatch({ type: 'LOADING_REPORTS' });
  
    try {
      const reportsData = await fetchReports(userId, token);
  
      dispatch({ type: 'SET_REPORTS_DATA', payload: reportsData });
    } catch (error) {
      console.error('Error fetching reports:', error);
      dispatch({ type: 'SET_REPORTS_ERROR', payload: error.message });
    }
  };
  
  export const fetchSingleReport = (userId, reportId, token) => async (dispatch) => {
    dispatch({ type: 'LOADING_REPORT' });
  
    try {
      const reportData = await fetchReportById(userId, reportId, token);
  
      dispatch({ type: 'SET_SINGLE_REPORT_DATA', payload: reportData });
    } catch (error) {
      console.error('Error fetching report:', error);
      dispatch({ type: 'SET_REPORTS_ERROR', payload: error.message });
    }
  };
  
  export const saveReport = (userId, reportData, token) => async (dispatch) => {
    dispatch({ type: 'SAVING_REPORT' });
  
    try {
      const createdReport = await createReport(userId, reportData, token);
  
      if (createdReport) {
        dispatch({ type: 'ADD_REPORT', payload: createdReport });
      } else {
        throw new Error('Failed to create report');
      }
    } catch (error) {
      console.error('Error creating report:', error);
      dispatch({ type: 'SET_REPORTS_ERROR', payload: error.message });
    }
  };
  
  export const updateExistingReport = (userId, reportId, updatedReportData, token) => async (dispatch) => {
    dispatch({ type: 'UPDATING_REPORT' });
  
    try {
      const response = await updateReport(userId, reportId, updatedReportData, token);
  
      if (response.success) {
        dispatch({ type: 'UPDATE_REPORT', payload: response.updatedReport });
      } else {
        throw new Error('Failed to update report');
      }
    } catch (error) {
      console.error('Error updating report:', error);
      dispatch({ type: 'SET_REPORTS_ERROR', payload: error.message });
    }
  };
  
  export const deleteExistingReport = (userId, reportId, token) => async (dispatch) => {
    dispatch({ type: 'DELETING_REPORT' });
  
    try {
      await deleteReport(userId, reportId, token); 
  
      dispatch({ type: 'DELETE_REPORT', payload: reportId });
    } catch (error) {
      console.error('Error deleting report:', error);
      dispatch({ type: 'SET_REPORTS_ERROR', payload: error.message });
    }
  };