import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="md:flex md:justify-between md:items-start">
          {/* Logo + Tagline */}
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://www.svgrepo.com/show/494022/travel.svg"
                className="h-16 w-auto rounded-md object-contain"
                alt="Travel Agency Logo"
              />
              <span className="text-xl font-semibold">
             тᖇเ𝐏ｍ𝕒𝓉ᵉ
              </span>
            </Link>
            <p className="mt-3 text-gray-500 text-sm max-w-sm">
              Discover, plan, and experience your next adventure with ease. 🌍
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 text-sm">
            {/* Resources */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-gray-900 uppercase tracking-wide">
                Resources
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link to="/" className="hover:text-orange-700 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-orange-700 transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-orange-700 transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-gray-900 uppercase tracking-wide">
                Follow Us
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-orange-700 transition"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-700 transition">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-700 transition">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-gray-900 uppercase tracking-wide">
                Legal
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-orange-700 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-700 transition">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <span>
            © {new Date().getFullYear()}{" "}
            <a href="#" className="text-orange-700 hover:underline">
              Sudeep Verma
            </a>{" "}
            — All rights reserved.
          </span>

          {/* Social Icons */}
          <div className="flex space-x-5 mt-4 sm:mt-0">
            {[
              {
                href: "#",
                label: "Facebook",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2c0-2 1.2-3.1 3-3.1.9 0 1.8.1 2 .1v2.3h-1.1c-1 0-1.3.6-1.3 1.2v1.6h2.5l-.4 3h-2.1v7A10 10 0 0 0 22 12" />
                  </svg>
                ),
              },
              {
                href: "#",
                label: "Twitter",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5.5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                ),
              },
              {
                href: "#",
                label: "GitHub",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.5-4-1.5a3.1 3.1 0 0 0-1.3-1.7c-1-.7.1-.7.1-.7a2.4 2.4 0 0 1 1.7 1.1 2.4 2.4 0 0 0 3.3.9 2.4 2.4 0 0 1 .7-1.5C7 16 4 15 4 10.7a4.6 4.6 0 0 1 1.2-3.1 4.3 4.3 0 0 1 .1-3s1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.3 18 4.6 18 4.6a4.3 4.3 0 0 1 .1 3 4.6 4.6 0 0 1 1.2 3.1C19.3 15 16.3 16 14 16.3a2.7 2.7 0 0 1 .8 2v2.9c0 .3.2.7.8.6A12 12 0 0 0 12 0" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-500 hover:text-orange-700 transition"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
