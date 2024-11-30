import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing, PrivacyPolicy, TandC, UserAuthPage, AboutUs, Page404, UserDashboard, UserProfile, BookMark, Checkout, EventSearch, OrgRegistrationLoginPage, OrginizationDashboard, OrginizationProfile, ShowEvent, AllEvent, FAQ, ReturnPolicy, EventDetail, MakeAccount, ContactUs } from './pages';
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
        <Route>
          <Route path='/' element={<Landing/> } />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TandC />} />
          <Route path="return-policy" element={<ReturnPolicy />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="account" element={<MakeAccount />} />
          <Route path="event" element={<EventDetail />} />
          <Route path="contact-us" element={<ContactUs />} />
        </Route>
        <Route path='/user'>
          <Route path="auth" element={<UserAuthPage />} />
          <Route path="dashboard/*" element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="bookmark" element={<BookMark />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="events" element={<EventSearch />} />
        </Route>
        <Route path='/organization'>
          {/* <Route path="registration" element={<OrgRegistrationLoginPage />} /> */}
          <Route path="*" element={<OrginizationDashboard />} />
          {/* <Route path="profile" element={<OrginizationProfile />} /> */}
          {/* <Route path="event/:id" element={<ShowEvent />} /> */}
          {/* <Route path="event/:id/edit" element={<AllEvent />} /> */}
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
