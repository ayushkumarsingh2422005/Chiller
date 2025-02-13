import React from "react";
import monkey from '../assets/images/monkey.png'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import currentlocation from '../assets/images/currentlocation.png';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#2A548C] to-[#0B1726] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Logo and Description Section - Enhanced spacing and styling */}
        <div className="space-y-6">
          <img 
            src={import.meta.env.VITE_FULL_LIGHT_LOGO_PATH} 
            alt="FestPay Logo" 
            className="h-20 hover:opacity-90 transition-opacity" 
          />
          <p className="text-sm leading-relaxed text-gray-300">
            {import.meta.env.VITE_AGENCY_NAME} is a comprehensive platform designed to streamline event
            management and participation for students and clubs...
          </p>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300 hover:scale-110">
                <FacebookIcon />
              </Link>
              <Link className="w-10 h-10 flex items-center justify-center bg-pink-500 rounded-full hover:bg-pink-600 transition-colors duration-300 hover:scale-110">
                <InstagramIcon />
              </Link>
              <Link className="w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full hover:bg-blue-500 transition-colors duration-300 hover:scale-110">
                <XIcon />
              </Link>
              <Link className="w-10 h-10 flex items-center justify-center bg-blue-700 rounded-full hover:bg-blue-800 transition-colors duration-300 hover:scale-110">
                <LinkedInIcon />
              </Link>
            </div>
          </div>
        </div>

        <div></div>

        {/* Quick Links - Enhanced hover effects and spacing */}
        <div className="flex flex-row sm:flex-col content-end justify-evenly gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={'/'} className="hover:text-blue-300 transition-colors duration-300">Home</Link></li>
              <li><Link to={'/about-us'} className="hover:text-blue-300 transition-colors duration-300">About Us</Link></li>
              <li><Link className="hover:text-blue-300 transition-colors duration-300">Features</Link></li>
              <li><Link href="/contact-us" className="hover:text-blue-300 transition-colors duration-300">Contact</Link></li>
              <li><Link to={'/faq'} className="hover:text-blue-300 transition-colors duration-300">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Our Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={'/terms-and-conditions'} className="hover:text-blue-300 transition-colors duration-300">Terms & condition</Link></li>
              <li><Link to={'/privacy-policy'} className="hover:text-blue-300 transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-blue-300 transition-colors duration-300">Transaction Policy</Link></li>
              <li><Link to={'/return-policy'} className="hover:text-blue-300 transition-colors duration-300">Return Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* User Actions - Enhanced styling */}
        <div className="flex flex-row sm:flex-col content-end justify-evenly gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Student</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to={'/register'} className="hover:text-blue-300 transition-colors duration-300">Register</Link></li>
              <li><Link to={'/login'} className="hover:text-blue-300 transition-colors duration-300">Log in</Link></li>
              <li><Link className="hover:text-blue-300 transition-colors duration-300">Explore Clubs</Link></li>
              <li><Link className="hover:text-blue-300 transition-colors duration-300">Payment History</Link></li>
              <li><Link className="hover:text-blue-300 transition-colors duration-300">Wallet</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Organization</h3>
            <ul className="space-y-3 text-sm">
              <li><Link className="hover:text-blue-300 transition-colors duration-300">Promote Event</Link></li>
              <li><Link className="hover:text-blue-300 transition-colors duration-300">Host an Event</Link></li>
              <li><Link to={'/dashboard'} className="hover:text-blue-300 transition-colors duration-300">DashBoard</Link></li>
              <li><Link className="hover:text-blue-300 transition-colors duration-300">Ticketing Solution</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Information - Enhanced layout */}
        <div className="pt-0">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-300">Contact Us</h3>
            <div className="space-y-2">
              <div className="items-center space-x-2 text-sm">
                <span className="font-semibold">Phone:</span><br />
                <a href="tel:+918299797516" className="hover:text-blue-300 transition-colors duration-300">+91 829 979 7516</a><br />
                <a href="tel:+918102568482" className="hover:text-blue-300 transition-colors duration-300">+91 810 256 8482</a>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <span className="font-semibold">Email:</span>
                <a href="mailto:hello@festpay.in" className="hover:text-blue-300 transition-colors duration-300">hello@festpay.in</a>
              </div>
              <div className="text-sm mt-4">
                <span className="font-semibold">Address:</span><br />

                {import.meta.env.VITE_AGENCY_NAME},<br />NIT Jamshedpur,<br />Jharkhand, 831014
              </div>
            </div>

            <img src={currentlocation} alt="Location Map" className="w-full rounded-lg shadow-lg hover:opacity-90 transition-opacity" />
          </div>
        </div>
      </div>

      <div className="border-t border-blue-700/50 mt-12 pt-6 text-center text-sm">
        <p className="text-gray-400">
          © 2024 {import.meta.env.VITE_AGENCY_NAME}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
