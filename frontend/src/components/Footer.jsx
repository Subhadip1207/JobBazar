import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-10 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-30">

          {/* Branding */}
          <div>
            <h2 className="text-2xl font-bold text-[#6A38C2] mb-3">JobBazar</h2>
            <p className="text-sm text-gray-600">
              Your #1 job destination. Find your dream role, apply, and get hired.
            </p>
          </div>


          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: <a href="mailto:subhadip003.dutta@gmail.com" className="text-blue-600 hover:underline">subhadip003.dutta@gmail.com</a></li>
              <li>Phone: <span className="text-gray-700">+91 8509729928</span></li>
              <li>Location: <span className="text-gray-700">Kolkata, India</span></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/subhadip.dutta.52035772" aria-label="Facebook" className="hover:text-blue-600">
                <Facebook size={20} />
              </a>
              <a href="https://github.com/Subhadip1207" aria-label="Twitter" className="hover:text-blue-600">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/subhadip-dutta-4466b5296/" aria-label="LinkedIn" className="hover:text-blue-600">
                <Linkedin size={20} />
              </a>
              <a href="mailto:subhadip003.dutta@gmail.com" aria-label="Mail" className="hover:text-blue-600">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} <span className="text-[#6A38C2] font-semibold">JobHunt</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
