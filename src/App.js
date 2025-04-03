import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import EasyQuiz from './Pages/EasyQuiz';
import MediumQuiz from './Pages/MediumQuiz';
import HardQuiz from './Pages/HardQuiz';
import login from './components/Login';

const App = () => {
    const { user } = useAuth();

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={user ? <EasyQuiz /> : <Login />} />
                <Route path="/easy" element={<EasyQuiz />} />
                <Route path="/medium" element={<MediumQuiz />} />
                <Route path="/hard" element={<HardQuiz />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;