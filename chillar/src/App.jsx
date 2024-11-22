import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FAQ, Landing, PrivacyPolicy, TandC, UserAuthPage, AboutUs, Page404, UserDashboard, UserProfile, BookMark, Checkout, EventSearch, OrgRegistrationLoginPage, OrginizationDashboard, OrginizationProfile, ShowEvent, EditEvent } from './pages';
import './app.css'
// import UserAuthPage from './pages/UserAuthPage';
// import AboutUs from './pages/AboutUs';
if (process.env.NODE_ENV === 'development') {
  const noop = () => { };
  console.warn = noop; // This will suppress all warnings
}

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-condition" element={<TandC />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="aboutus" element={<AboutUs />} />
        </Route>
        <Route path='/user'>
          <Route path="registration" element={<UserAuthPage />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="bookmark" element={<BookMark />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="events" element={<EventSearch />} />
        </Route>
        <Route path='/org'>
          <Route path="registration" element={<OrgRegistrationLoginPage />} />
          <Route path="dashboard" element={<OrginizationDashboard />} />
          <Route path="profile" element={<OrginizationProfile />} />
          <Route path="event/:id" element={<ShowEvent />} />
          <Route path="event/:id/edit" element={<EditEvent />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
