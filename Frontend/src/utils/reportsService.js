import axios from 'axios';
const BASE_URL = 'http://localhost:8081/reports';

// Fetch all reports for a specific user
export const fetchReports = async (userId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

// Fetch a specific report by its ID
export const fetchReportById = async (userId, reportId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/${reportId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error;
  }
};

// Create a new report
export const createReport = async (userId, reportData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/${userId}`, reportData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.report;
  } catch (error) {
    console.error('Error creating report:', error);
    throw error;
  }
};

// Update an existing report
export const updateReport = async (userId, reportId, updatedReportData, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/${userId}/${reportId}`, updatedReportData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating report:', error);
    throw error;
  }
};

// Delete a report
export const deleteReport = async (userId, reportId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${userId}/${reportId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting report:', error);
    throw error;
  }
};
