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
    <footer className="bg-gradient-to-b from-[#2A548C] to-[#0B1726] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo and Description */}
        <div className="space-y-4 ">
          <img src={monkey} alt="Chillar Logo" className="h-20" />
          <p className="text-sm leading-relaxed">
            Chillar is a comprehensive platform designed to streamline event
            management and participation for students and clubs. It allows
            students to easily register, discover events, and make secure
            payments, while clubs can create and manage events, track
            participant lists, and handle payments efficiently. With
            user-friendly tools and seamless integration, Chillar simplifies the
            entire process, making event organization and participation
            hassle-free for all.
          </p>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-700">
              <FacebookIcon />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-pink-500 rounded-full hover:bg-pink-600">
              <InstagramIcon />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full hover:bg-blue-500">
              <XIcon />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-blue-700 rounded-full hover:bg-blue-800">
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <div></div>
        {/* Quick Links */}
        <div className="pt-24">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Features</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
          </ul>
          <br /><br />

          <h3 className="text-lg font-semibold mb-4">Our Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={'/terms-and-conditon'} className="hover:underline">Terms & condition</Link></li>
            <li><Link to={'/privacy-policy'} className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:underline">Transaction Policy</Link></li>
            <li><Link href="#" className="hover:underline">Contact</Link></li>
            <li><Link href="#" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>

        {/* User Actions */}
        <div className="pt-24">
          <h3 className="text-lg font-semibold mb-4">User Actions</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Register</a></li>
            <li><a href="#" className="hover:underline">Log in</a></li>
            <li><a href="#" className="hover:underline">Create Event</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="pt-24">
          <h3 className="text-lg font-semibold mb-4">Adress</h3>
          <div className="text-sm">
            Phone : +91 829 979 7516
          </div>
          <div className="text-sm">
            Email : ayush2422005@gmail.com
          </div> <br />
          <div className="text-sm">
            Chillar, 123 Main St, City, State, 12345
          </div><br />
          <img src={currentlocation} alt="" className="w-full" />
        </div>
      </div>

      <div className="border-t border-blue-700 mt-8 pt-4 text-center text-sm">
        © 2024 Chillar. All Rights Reserved.
      </div>
    </footer>
  );
}
