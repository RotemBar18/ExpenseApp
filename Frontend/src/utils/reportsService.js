import axiosInstance from './axiosInstance';


export const fetchReports = async (boradId, token) => {
  try {
    const response = await  axiosInstance.get(`/reports/${boradId}`, {
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

export const fetchReportById = async (boradId, reportId, token) => {
  try {
    const response = await  axiosInstance.get(`/reports/${boradId}/${reportId}`, {
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

export const createReport = async (boradId,userId, reportData, token) => {
  try {
    const response = await  axiosInstance.post(`/reports/${userId}/${boradId}`, reportData, {
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

export const updateReport = async (boradId, reportId, updatedReportData, token) => {
  try {
    const response = await  axiosInstance.put(`/reports/${boradId}/${reportId}`, updatedReportData, {
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

export const deleteReport = async (boradId, reportId, token) => {
  try {
    const response = await  axiosInstance.delete(`/reports/${boradId}/${reportId}`, {
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
