import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MountainList from './components/MountainList';
import MountainDetail from './components/MountainDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MountainList />} />
        <Route path="/mountain/:id" element={<MountainDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
