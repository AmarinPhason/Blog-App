import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-xl font-bold">GPT Company</h2>
            <p className="text-gray-400">
              © 2024 GPT Company. All rights reserved.
            </p>
          </div>
          <div className="w-full sm:w-auto text-center sm:text-right">
            <ul className="flex justify-center sm:justify-end space-x-4">
              <li>
                <a href="/about" className="hover:text-gray-400">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gray-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
