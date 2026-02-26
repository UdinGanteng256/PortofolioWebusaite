import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PerformanceProvider } from './context/PerformanceContext.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <PerformanceProvider>
            <App />
        </PerformanceProvider>
    </React.StrictMode>,
)
