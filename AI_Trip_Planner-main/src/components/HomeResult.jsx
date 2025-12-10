import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MapPin, Utensils, Building2, Landmark } from "lucide-react";

export default function HomeResult() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const city = params.get("city");

  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({ lat: null, lon: null });

  const getCategoryIcon = (type) => {
    if (type.includes("restaurant")) return <Utensils className="text-orange-500" />;
    if (type.includes("hotel")) return <Building2 className="text-blue-500" />;
    if (type.includes("tourism")) return <Landmark className="text-purple-500" />;
    return <MapPin className="text-green-600" />;
  };

  useEffect(() => {
    if (!city) return;

    const fetchPlaces = async () => {
      setLoading(true);
      try {
        // 1️⃣ Get city coordinates
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${city}&country=India&format=json`
        );
        const geoData = await geoRes.json();
        if (!geoData.length) {
          alert("City not found!");
          return;
        }

        const { lat, lon } = geoData[0];
        setCoords({ lat, lon });

        // 2️⃣ Fetch nearby places (restaurants, hotels, tourism)
        const overpassQuery = `
          [out:json][timeout:25];
          (
            node["amenity"="restaurant"](around:3000,${lat},${lon});
            node["amenity"="hotel"](around:3000,${lat},${lon});
            node["tourism"](around:3000,${lat},${lon});
          );
          out body;
        `;

        const res = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: overpassQuery,
        });
        const dataRes = await res.json();

        const elements = dataRes.elements.map((el) => ({
          id: el.id,
          name: el.tags.name || "Unnamed Place",
          type: el.tags.amenity || el.tags.tourism || "Attraction",
          lat: el.lat,
          lon: el.lon,
        }));

        setNearbyPlaces(elements.slice(0, 12));
      } catch (err) {
        console.error(err);
        alert("Error fetching nearby places.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [city]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Results for: <span className="text-green-600">{city}</span>
      </h1>

      {loading ? (
        <p className="text-gray-600 text-center">Loading nearby places...</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Nearby Places */}
          <div className="lg:w-2/5 bg-white rounded-xl shadow-md p-4 overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-semibold mb-4">Nearby Places</h2>
            {nearbyPlaces.length === 0 ? (
              <p className="text-gray-500">No nearby places found.</p>
            ) : (
              <ul className="space-y-4">
                {nearbyPlaces.map((place) => (
                  <li
                    key={place.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition cursor-pointer"
                  >
                    {getCategoryIcon(place.type)}
                    <span className="font-medium">{place.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Column: Map */}
          <div className="lg:w-3/5 rounded-xl overflow-hidden shadow-md">
            {coords.lat && coords.lon ? (
              <iframe
                title="city-map"
                src={`https://www.google.com/maps?q=${coords.lat},${coords.lon}&z=13&output=embed`}
                className="w-full h-[80vh] border-0"
                loading="lazy"
              ></iframe>
            ) : (
              <p className="text-gray-500 text-center p-10">Map not available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}