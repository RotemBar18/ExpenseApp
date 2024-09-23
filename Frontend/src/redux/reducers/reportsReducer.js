// reportsReducer.js
const initialState = {
  reports: [],
  loading: false,
  error: null,
};

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REPORT':
      return {
        ...state,
        reports: [...state.reports, action.payload],
      };
    case 'SET_REPORTS_DATA':
      return {
        ...state,
        reports: action.payload,
        loading: false,
        error: null,
      };
    case 'DELETE_REPORT':
      return {
        ...state,
        reports: state.reports.filter((report) => report.ReportId !== action.payload),
      };
    // Other cases like loading, error, etc.
    default:
      return state;
  }
};

export default reportsReducer;
