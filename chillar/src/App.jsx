import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FAQ, Landing, PrivacyPolicy } from './pages';
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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;
