import './App.css';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import  Home from './pages/homepage';
import Statistics from './pages/Statistics';
import Settings from "./pages/Settings";
import Expenses from './pages/ExpensesPage';
import MainPage from './pages/MainPage';
import ReportsPage from './pages/ReportsPage';
import { createGlobalStyle } from 'styled-components';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ThemeProviderWrapper from './components/ThemeProviderWrapper';
import Layout from './components/Layout';  // Import the Layout component

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    src: url('/fonts/Poppins-Regular.ttf') format('truetype');
    font-weight: 400; 
    font-style: normal;
  }

  @font-face {
    font-family: 'Poppins';
    src: url('/fonts/Poppins-Bold.ttf') format('truetype');
    font-weight: 700; 
    font-style: normal;
  }

  @font-face {
    font-family: 'Poppins';
    src: url('/fonts/Poppins-Black.ttf') format('truetype');
    font-weight: 900; 
    font-style: normal;
  }

  @font-face {
    font-family: 'Poppins';
    src: url('/fonts/Poppins-ExtraBold.ttf') format('truetype');
    font-weight: 800; 
    font-style: normal;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProviderWrapper>
        <GlobalStyle />
        <Router>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<Layout />}>
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Route>
          </Routes>
        </Router>

      </ThemeProviderWrapper>
    </Provider>
  );
}

export default App;

