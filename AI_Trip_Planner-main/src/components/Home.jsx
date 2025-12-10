import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fetch city suggestions
  useEffect(() => {
    if (!city) return;
    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" }),
    })
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.data.filter((c) =>
          c.toLowerCase().startsWith(city.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));
      })
      .catch(console.error);
  }, [city]);

  const handleSearch = (selectedCity) => {
    const targetCity = selectedCity || city;
    if (!targetCity) return;
    navigate(`/trips?destination=${encodeURIComponent(targetCity)}`);
  };

  return (
    <div className="overflow-x-hidden">
      {/* 🌍 Hero Section */}
      <section
        className="relative h-[90vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://rare-gallery.com/uploads/posts/1172316-landscape-mountains-sunset-hill-nature-sky-road-morning-valley-mountain-pass-highway-Alps-plateau-infrastructure-cloud-mountain-highland-loch-rural-area-mountainous-lan.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <motion.div
          className="relative z-10 text-center text-white px-4 w-full max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Explore Smarter — Let AI Guide Your{" "}
            <span className="text-green-400">Adventure</span>
          </h1>

          <p className="text-lg md:text-xl mb-6">
            Find the best destinations, hotels, and travel experiences worldwide.
          </p>

          {/* 🔎 Search Bar */}
          <div className="relative">
            <div className="flex bg-white rounded-full overflow-hidden shadow-lg max-w-xl mx-auto">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Where to?"
                className="flex-grow px-5 py-3 text-gray-700 focus:outline-none rounded-l-full"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={() => handleSearch()}
                className="bg-green-800 text-white px-6 py-3 font-semibold hover:bg-green-700 transition rounded-r-full"
              >
                Search
              </button>
            </div>

            {/* Autocomplete suggestions */}
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 text-black bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto z-50">
                {suggestions.map((c, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                    onClick={() => handleSearch(c)}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </section>

      {/* 🏖️ Popular Destinations */}
      <section className="py-16 px-6 md:px-12 bg-gray-50 text-center">
        <motion.h2
          className="text-3xl font-semibold mb-10 text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Popular Destinations
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Bali, Indonesia",
              img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Paris, France",
              img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Tokyo, Japan",
              img: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80",
            },
          ].map((place, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-xl shadow-lg group"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={place.img}
                alt={place.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition"></div>
              <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                {place.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🧭 Plan Your Trip */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-12 text-gray-800">
          Plan Your Perfect Trip
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10 max-w-5xl mx-auto">
          {[
            {
              step: "1️⃣",
              title: "Search Destination",
              desc: "Explore amazing destinations that match your vibe.",
            },
            {
              step: "2️⃣",
              title: "Compare & Choose",
              desc: "View top spots, hotels, and travel experiences.",
            },
            {
              step: "3️⃣",
              title: "Book & Go",
              desc: "Confirm your plans and start your journey!",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-gray-100 p-8 rounded-xl shadow-md hover:shadow-lg w-72"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-3">{item.step}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 Traveler Reviews */}
      <section className="bg-green-900 text-white py-16 text-center">
        <h2 className="text-3xl font-semibold mb-10">Traveler Reviews</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Sophie",
              text: "TripMate made planning so easy! Found hidden gems in Bali 🌴",
            },
            {
              name: "Rahul",
              text: "Loved the UI and simplicity. Booked my Tokyo trip in minutes!",
            },
            {
              name: "Emma",
              text: "Perfect for exploring new destinations every weekend ✈️",
            },
          ].map((review, i) => (
            <motion.div
              key={i}
              className="bg-white/10 p-6 rounded-lg backdrop-blur-md hover:bg-white/20 transition"
              whileHover={{ scale: 1.05 }}
            >
              <p className="italic mb-3">“{review.text}”</p>
              <h4 className="font-semibold">- {review.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✈️ Subscribe Section */}
      <section className="bg-gray-900 text-white py-14 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">
          Get Travel Inspiration Weekly ✈️
        </h2>
        <p className="text-gray-300 mb-6">
          Subscribe to receive exclusive travel deals and hidden spots!
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-l-lg text-gray-800 w-72"
          />
          <button className="px-6 py-3 bg-green-800 rounded-r-lg hover:bg-green-700 transition">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
