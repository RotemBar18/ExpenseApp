import {
    fetchReports,
    fetchReportById,
    createReport,
    updateReport,
    deleteReport,
  } from '../../utils/reportsService';
  
  export const fetchBoardReports = (boradId, token) => async (dispatch) => {
    dispatch({ type: 'LOADING_REPORTS' });
  
    try {
      const reportsData = await fetchReports(boradId, token);
  
      dispatch({ type: 'SET_REPORTS_DATA', payload: reportsData });
    } catch (error) {
      console.error('Error fetching reports:', error);
      dispatch({ type: 'SET_REPORTS_ERROR', payload: error.message });
    }
  };
  
  export const fetchSingleReport = (boradId, reportId, token) => async (dispatch) => {
    dispatch({ type: 'LOADING_REPORT' });
  
    try {
      const reportData = await fetchReportById(boradId, reportId, token);
  
      dispatch({ type: 'SET_SINGLE_REPORT_DATA', payload: reportData });
    } catch (error) {
      console.error('Error fetching report:', error);
      dispatch({ type: 'SET_REPORTS_ERROR', payload: error.message });
    }
  };
  
  export const saveReport = (boradId,userId, reportData, token) => async (dispatch) => {
    dispatch({ type: 'SAVING_REPORT' });
  
    try {
  console.log(reportData)

      const createdReport = await createReport(boradId,userId, reportData, token);
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
  
  export const updateExistingReport = (boradId, reportId, updatedReportData, token) => async (dispatch) => {
    dispatch({ type: 'UPDATING_REPORT' });
  
    try {
      const response = await updateReport(boradId, reportId, updatedReportData, token);
  
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
  
  export const deleteExistingReport = (boradId, reportId, token) => async (dispatch) => {
    dispatch({ type: 'DELETING_REPORT' });
  
    try {
      await deleteReport(boradId, reportId, token); 
  
      dispatch({ type: 'DELETE_REPORT', payload: reportId });
    } catch (error) {
      console.error('Error deleting report:', error);
      dispatch({ type: 'SET_REPORTS_ERROR', payload: error.message });
    }
  };