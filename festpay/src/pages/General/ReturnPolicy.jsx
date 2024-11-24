import React from 'react';
import { TopBar } from '../../components';
import ppPdf from '../../assets/policy/returnpolicy.pdf';

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <TopBar />
      <div className="w-full h-full">
        <iframe
          src={ppPdf}
          title="Privacy Policy"
          className="w-full h-screen border-none rounded-md"
          style={{ objectFit: 'contain' }} // Ensures PDF scales correctly without cropping
        />
      </div>
    </div>
  );
}
