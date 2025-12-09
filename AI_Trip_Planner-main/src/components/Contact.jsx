import React from "react";

export default function Contact() {
  return (
    <div className="relative flex items-top justify-center min-h-[700px] bg-gradient-to-b from-green-50 to-white sm:items-center sm:pt-0">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden shadow-lg rounded-2xl bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Section */}
            <div className="p-8 bg-green-100 sm:rounded-l-2xl">
              <h1 className="text-4xl font-extrabold text-green-800">
                Get in Touch 🌿
              </h1>
              <p className="text-lg font-medium text-green-700 mt-3">
                Fill out the form and we’ll get back to you shortly!
              </p>

              <div className="flex items-center mt-8 text-green-700">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="ml-4 font-semibold">
                HQ,Indore Madhya Pradesh
                </span>
              </div>

              <div className="flex items-center mt-5 text-green-700">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.49a1 1 0 01-.5 1.21l-2.26 1.13a11.04 11.04 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"
                  />
                </svg>
                <span className="ml-4 font-semibold">+91 9876543210</span>
              </div>

              <div className="flex items-center mt-5 text-green-700">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="ml-4 font-semibold">tripmate.com</span>
              </div>
            </div>

            {/* Right Section (Form) */}
            <form className="p-8 flex flex-col justify-center bg-white">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Contact Form
              </h2>

              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                className="mt-2 py-3 px-4 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
              />

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className="mt-4 py-3 px-4 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
              />

              <input
                type="tel"
                name="tel"
                id="tel"
                placeholder="Phone Number"
                className="mt-4 py-3 px-4 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
              />

              <textarea
                name="message"
                id="message"
                placeholder="Your Message..."
                rows="4"
                className="mt-4 py-3 px-4 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
              ></textarea>

              <button
                type="submit"
                className="mt-5 w-full md:w-40 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
