import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx'
import { ToastContainer } from 'react-toastify';
import axios from 'axios'

const theme = createTheme({
  typography: { 
    fontFamily: "Montserrat, sans-serif",
    allVariants: { color: "black" },
  },
})

// axios.defaults.baseURL = "http://localhost:8000/api/v1";
axios.defaults.baseURL = "https://ai-chat-app-backend-ashy.vercel.app/api/v1";
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <ToastContainer position="top-right" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)