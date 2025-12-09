import React from "react";
import { motion } from "framer-motion";

export default function Reviews() {
  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
           What Travelers Say
        </h2>
        <p className="text-gray-600 mb-10">
          Real experiences from people who’ve used{" "}
          <span className="font-semibold text-blue-600">TripMate</span> to plan their dream adventures.
        </p>

        {/* Under Construction Notice */}
        <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-700 p-6 rounded-xl mb-16">
          <p className="font-semibold text-lg">
            ⚠️ Review section is coming soon! Work in progress...
          </p>
          <p className="text-sm mt-1">
            You’ll be able to read and share reviews very soon.
          </p>
        </div>

     
        </div>
      </div>
 
  );
}
