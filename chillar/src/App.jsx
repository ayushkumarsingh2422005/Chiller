import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages';
import './app.css'
// import UserRegistration from './pages/UserRegistrationLoginPage';
import UserRegistrationLoginPage from './pages/UserRegistrationLoginPage';
if (process.env.NODE_ENV === 'development') {
  const noop = () => {};
  console.warn = noop; // This will suppress all warnings
}

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user-registration" element={<UserRegistrationLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
