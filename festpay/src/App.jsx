import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Landing, PrivacyPolicy, TandC, UserAuthPage, AboutUs, Page404, UserDashboard, UserProfile, BookMark, Checkout, EventSearch, OrginizationDashboard, OrginizationProfile, ShowEvent, AllEvent, FAQ, ReturnPolicy, EventDetail, MakeAccount, ContactUs, Dashboard, OrgAuthPage, Clubs, ClubDetails, EventDetails, EarlyAccess, NitJsrClub, Features, PaymentHistory, PromoteEvent, ComingSoon, HostEvent, TicketingSolution } from './pages';
import './app.css'
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthGuard } from './components/AuthGuard';

if (process.env.NODE_ENV === 'development') {
  const noop = () => { };
  console.warn = noop; // This will suppress all warnings
}

function App() {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Landing />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TandC />} />
        <Route path="return-policy" element={<ReturnPolicy />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="account" element={<MakeAccount />} />
        <Route path="event" element={<EventDetail />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="promote-event" element={<PromoteEvent />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clubs" element={<Clubs />} />
        <Route path="clubs/:id" element={<ClubDetails />} />
        <Route path="nit-jsr-club" element={<NitJsrClub />} />
        <Route path="early-access" element={<EarlyAccess />} />
        <Route path="features" element={<Features />} />
        <Route path="payment-history" element={<PaymentHistory />} />
        <Route path="coming-soon" element={<ComingSoon />} />
        <Route path="host-event" element={<HostEvent />} />
        <Route path="ticketing-solution" element={<TicketingSolution />} />
      </Route>
      <Route path='/user'>
        <Route path="auth" element={<AuthGuard><UserAuthPage /></AuthGuard>} />
        <Route
          path="dashboard/*"
          element={
            <UserDashboard />
          }
        />
      </Route>
      <Route path='/organization'>
        <Route path="auth" element={<AuthGuard><OrgAuthPage /></AuthGuard>} />
        <Route
          path="dashboard/*"
          element={
            <OrginizationDashboard />
          }
        />
        <Route path="event/:id" element={<EventDetails />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
