import { useParams, useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PlaceDetails() {
  const { id } = useParams();
  const location = useLocation();
  const place = location.state?.place;

  if (!place) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 py-28  ">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Place not found</h2>
        <p className="text-gray-500 mb-4">Please go back to Trip Results.</p>
        <Link
          to="/results"
          className="inline-flex items-center gap-2 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition"
        >
          <ArrowLeft size={18} /> Back to Trip Results
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b to-white py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/results"
          className="inline-flex items-center gap-2 mb-6font-semibold hover:text-green-800 transition"
        >
          <ArrowLeft size={18} /> Back to Trip Results
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Image */}
           

            {/* Right: Details */}
            <div className="flex-1">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-3">{place.name}</h2>
              <p className="text-gray-600 mb-4">{place.description}</p>

              {place.rating && <p className="text-lg font-semibold text-green-600 mb-2">⭐ Rating: {place.rating}</p>}
              {place.address && <p className="text-gray-700 mb-4">📍 <span className="font-medium">{place.address}</span></p>}

              <a
                href={place.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
              >
                Visit Website
              </a>
            </div>
          </div>

          {/* Map */}
          {place.lat && place.lon && (
            <div className="mt-8 w-full h-80 rounded-xl overflow-hidden shadow-sm">
              <iframe
                title={`map-${place.id}`}
                src={`https://www.google.com/maps?q=${place.lat},${place.lon}&z=14&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
