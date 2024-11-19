import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages';
import './app.css'
import UserAuthPage from './pages/UserAuthPage';
if (process.env.NODE_ENV === 'development') {
  const noop = () => {};
  console.warn = noop; // This will suppress all warnings
}

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user-registration" element={<UserAuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
