import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/homepage';
import Statistics from './pages/Statistics';
import Settings from "./pages/Settings";
import Signup from './components/signup';
import Expenses from './pages/ExpensesPage';
import MainPage from './pages/mainpage';
import ReportsPage from './pages/ReportsPage';
import { createGlobalStyle } from 'styled-components';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import ThemeProviderWrapper from './components/ThemeProviderWrapper';  

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    src: url('./src/components/assets/fonts/Poppins-Regular.ttf') format('truetype');
    font-weight: 400; 
    font-style: normal;
  }

  @font-face {
    font-family: 'Poppins';
    src: url('./src/components/assets/fonts/Poppins-Bold.ttf') format('truetype');
    font-weight: 700; /* Bold */
    font-style: normal;
  }

  @font-face {
    font-family: 'Poppins';
    src: url('./src/components/assets/fonts/Poppins-Black.ttf') format('truetype');
    font-weight: 900; /* Black */
    font-style: normal;
  }

  @font-face {
    font-family: 'Poppins';
    src: url('./src/components/assets/fonts/Poppins-ExtraBold.ttf') format('truetype');
    font-weight: 800; /* Extra Bold */
    font-style: normal;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProviderWrapper> {/* Wrap your app with the ThemeProviderWrapper */}
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/Expenses" element={<Expenses />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Main" element={<MainPage />} />
          <Route path="/Sign-up" element={<Signup />} />
          <Route path="/Reports" element={<ReportsPage />} />
        </Routes>
      </ThemeProviderWrapper>
    </Provider>
  );
}

export default App;
