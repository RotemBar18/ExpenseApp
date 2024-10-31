import axios from 'axios';
import axiosInstance from './axiosInstance';
const BASE_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8081' 
    : 'https://expenseapp-production.up.railway.app';
export const fetchReports = async (userId, token) => {
  try {
    const response = await  axiosInstance.get(`/reports/${userId}`, {
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

export const fetchReportById = async (userId, reportId, token) => {
  try {
    const response = await  axiosInstance.get(`/reports/${userId}/${reportId}`, {
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

export const createReport = async (userId, reportData, token) => {
  try {
    const response = await  axiosInstance.put(`/reports/${userId}`, reportData, {
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

export const updateReport = async (userId, reportId, updatedReportData, token) => {
  try {
    const response = await  axiosInstance.put(`/reports/${userId}/${reportId}`, updatedReportData, {
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

export const deleteReport = async (userId, reportId, token) => {
  try {
    const response = await  axiosInstance.delete(`/reports/${userId}/${reportId}`, {
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
