import React from 'react';
import { TopBar } from '../components';
import tacPdf from '../assets/policy/termsandcondition.pdf';

export default function TandC() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <TopBar />
      <div className="w-full h-full">
        <iframe
          src={tacPdf}
          title="Privacy Policy"
          className="w-full h-screen border-none rounded-md"
          style={{ objectFit: 'contain' }} // Ensures PDF scales correctly without cropping
        />
      </div>
    </div>
  );
}
