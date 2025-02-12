import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"; // Sử dụng react-icons cho biểu tượng mạng xã hội

const Footer = () => {
  return (
    <footer className="bg-[#191229] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Phần thông tin liên hệ */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400 mt-4">
              Email: trananhtuan2005dh@gmail.com
            </p>
            <p className="text-gray-400 mt-4">Phone number: +84 0123 456 789</p>
            <p className="text-gray-400 mt-4">
              Address: UIT-VNUHCM, Thu Duc city, Ho Chi Minh City, Viet Nam
            </p>
          </div>

          {/* Phần liên kết nhanh */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Quick Information</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About me
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-400 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white">
                  Private policies
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white">
                  Terms of use
                </a>
              </li>
            </ul>
          </div>

          {/* Phần mạng xã hội */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-4">Follow me</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FontAwesomeIcon icon={faFacebook} size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FontAwesomeIcon icon={faInstagram} size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FontAwesomeIcon icon={faLinkedin} size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Phần bản quyền */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} TheFlourine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
