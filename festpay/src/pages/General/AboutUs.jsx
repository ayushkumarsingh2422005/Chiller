import React from "react";
import bg from "../../assets/images/aboutusBg.png";
import { Footer, TopBar } from "../../components";

export default function AboutUs() {
  return (
    <>
      <TopBar />
      <img src={bg} alt="" className="mt-16 w-full" /> <br /><br />

      {/* Who We Are Section */}
      <div
        className="text-[40px] md:text-[56px] text-center"
        style={{
          fontFamily: "Krona One",
        }}
      >
        Who We Are <span className="text-[#1F4EB4]">?</span>
        <div className="w-20 h-1 bg-[#1F4EB4] mx-auto rounded-lg"></div>
      </div>
      <br />
      <div className="max-w-4xl mx-auto text-center text-[16px] md:text-[20px] font-medium">
        We are Chillar, a platform dedicated to simplifying event management and payments for students and clubs, fostering seamless campus engagement.
      </div>
      <br /><br /><br /><br />

      {/* Our Mission Section */}
      <div
        className="text-[40px] md:text-[56px] text-center"
        style={{
          fontFamily: "Krona One",
        }}
      >
        OUR <span className="text-[#1F4EB4]">MISSION</span>
        <div className="w-20 h-1 bg-[#1F4EB4] mx-auto rounded-lg"></div>
      </div>
      <br />
      <div className="max-w-4xl mx-auto text-center text-[16px] md:text-[20px] font-medium">
        We are Chillar, a platform dedicated to simplifying event management and payments for students and clubs, fostering seamless campus engagement.
      </div>
      <br /><br /><br /><br />

      {/* Core Values Section */}
      <div
        className="text-[40px] md:text-[56px] text-center"
        style={{ fontFamily: "Krona One" }}
      >
        CORE <span className="text-[#1F4EB4]">VALUES</span>
        <div className="w-20 h-1 bg-[#1F4EB4] mx-auto rounded-lg"></div>
      </div>
      <br />
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto items-center justify-center px-4">
        {/* Innovation */}
        <div className="flex flex-col items-center bg-[#EAF1FF] p-6 rounded-lg shadow-lg w-full md:w-1/3">
          <img
            src="https://via.placeholder.com/100"
            alt="Innovation"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-[20px] md:text-[24px] font-bold text-[#1F4EB4]">INNOVATION</h3>
          <p className="text-center text-[14px] md:text-[16px] mt-2">
            We constantly evolve to meet user needs.
          </p>
        </div>

        {/* Efficiency */}
        <div className="flex flex-col items-center bg-[#EAF1FF] p-6 rounded-lg shadow-lg w-full md:w-1/3">
          <img
            src="https://via.placeholder.com/100"
            alt="Efficiency"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-[20px] md:text-[24px] font-bold text-[#1F4EB4]">EFFICIENCY</h3>
          <p className="text-center text-[14px] md:text-[16px] mt-2">
            We value your time and simplify processes.
          </p>
        </div>

        {/* Trust */}
        <div className="flex flex-col items-center bg-[#EAF1FF] p-6 rounded-lg shadow-lg w-full md:w-1/3">
          <img
            src="https://via.placeholder.com/100"
            alt="Trust"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-[20px] md:text-[24px] font-bold text-[#1F4EB4]">TRUST</h3>
          <p className="text-center text-[14px] md:text-[16px] mt-2">
            Your data and transactions are secure with us.
          </p>
        </div>
      </div>
      <br /><br />

      <Footer />
    </>
  );
}
