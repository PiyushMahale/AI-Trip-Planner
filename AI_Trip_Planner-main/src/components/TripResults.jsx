import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Coffee, Building2, Utensils, Landmark } from "lucide-react";
import { useAuth } from "../AuthContext";
import { saveTripToDB } from "../services/tripService";

export default function TripResults() {
  const { state } = useLocation();
  const { destination, days, startDate, budget, travelType } = state || {};
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (destination) fetchNearbyPlaces(destination);
  }, [destination]);

 
// Save trip to Firestore
useEffect(() => {
  if (!destination || !days || !startDate || !budget || !travelType) return;

  const tripData = {
    destination,
    days,
    startDate,
    budget,
    travelType,
  };
  saveTripToDB(tripData, user?.email)
    .then((id) => console.log("Trip saved to Firestore:", id))
    .catch((err) => console.error("Error saving trip:", err));

}, [destination, days, startDate, budget, travelType]);



  const fetchNearbyPlaces = async (city) => {
    try {
      setLoading(true);
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${city}&country=India&format=json`
      );
      const geoData = await geoRes.json();
      if (!geoData.length) return;

      const { lat, lon } = geoData[0];

      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["tourism"](around:3000,${lat},${lon});
          node["amenity"="restaurant"](around:3000,${lat},${lon});
          node["amenity"="hotel"](around:3000,${lat},${lon});
          node["amenity"="place_of_worship"](around:3000,${lat},${lon});
        );
        out body;
      `;

      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: overpassQuery,
      });
      const data = await res.json();

      const elements = data.elements.map((el) => ({
        id: el.id,
        name: el.tags.name || "Unnamed Place",
        type: el.tags.tourism || el.tags.amenity || el.tags.historic || "Attraction",
        lat: el.lat,
        lon: el.lon,
        description: "A must-visit spot in this city — perfect for sightseeing, food, or culture.",
      }));

      setNearbyPlaces(elements.slice(0, 9));
      generateItinerary(elements);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateItinerary = (places) => {
    const daysCount = Math.min(Math.ceil(places.length / 4), days || 3);
    const newItinerary = [];
    for (let i = 0; i < daysCount; i++) {
      newItinerary.push({
        day: i + 1,
        activities: places.slice(i * 4, i * 4 + 4),
      });
    }
    setItinerary(newItinerary);
  };

  const getCategoryIcon = (type) => {
    if (type.includes("restaurant")) return <Utensils className="text-orange-500" />;
    if (type.includes("hotel")) return <Building2 className="text-blue-500" />;
    if (type.includes("place_of_worship")) return <Landmark className="text-purple-500" />;
    if (type.includes("cafe")) return <Coffee className="text-yellow-500" />;
    return <MapPin className="text-green-600" />;
  };

  if (!destination)
    return (
      <div className="p-10 py-28 text-center">
        <p className="text-gray-700 text-lg">No destination found.</p>
        <Link
          to="/trips"
          className="text-green-600 underline font-semibold hover:text-green-800"
        >
          Go Back
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-extrabold text-center mb-3 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
           {destination} Trip Plan
        </motion.h1>

        <motion.p
          className="text-center mb-10 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {days}-day {travelType} trip | {budget} budget | Start: {startDate}
        </motion.p>

        <motion.h2
          className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Top Recommendations in {destination}
        </motion.h2>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Fetching nearby places...</p>
        ) : nearbyPlaces.length > 0 ? (
          <div className="space-y-8">
            {nearbyPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                className="flex flex-col md:flex-row justify-between items-stretch bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.01 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/place/${place.id}`, { state: { place } })}
              >
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-xl text-gray-800">
                        {place.name.length > 30 ? place.name.slice(0, 30) + "..." : place.name}
                      </h3>
                      {getCategoryIcon(place.type)}
                    </div>
                    <p className="text-sm text-gray-500 capitalize mb-2">{place.type}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{place.description}</p>
                  </div>
                  <button className="mt-4 w-fit text-green-600 font-semibold hover:text-green-800 transition">
                    View Details →
                  </button>
                </div>

                <div className="md:w-1/2">
                  <iframe
                    title={`map-${place.id}`}
                    src={`https://www.google.com/maps?q=${place.lat},${place.lon}&z=14&output=embed`}
                    className="w-full h-56 md:h-full border-0"
                    loading="lazy"
                  ></iframe>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">No nearby attractions found.</p>
        )}

        {itinerary.length > 0 && (
          <motion.div className="mt-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-2xl font-bold mb-5 text-green-700 flex items-center gap-2">🗓️ Suggested Itinerary</h2>
            {itinerary.map((day) => (
              <div key={day.day} className="mb-6 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Day {day.day} Plan</h3>
                <ul className="space-y-2">
                  {day.activities.map((act) => (
                    <li key={act.id} className="flex items-center gap-2 text-gray-700">
                      {getCategoryIcon(act.type)}
                      <span>{act.name}</span>
                      <span className="text-gray-500 text-sm">— {act.type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
