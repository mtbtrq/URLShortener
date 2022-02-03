import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Statistics from './components/Statistics';
import Home from './components/Home';
import Admin from './components/Admin';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/statistics" element={<Statistics />}/>
                <Route path="/admin" element={<Admin />}/>
            </Routes>
      </Router>
    );
};

export default App;