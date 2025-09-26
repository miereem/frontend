import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SpecialOperationsPage } from './pages/SpecialOperationsPage';
import { Navigation } from './components/layout/Navigation';
import './styles/globals.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/operations" element={<SpecialOperationsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;