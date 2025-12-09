import React, { useEffect, useState } from "react";
import { getTripsForUser } from "../services/tripService";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

export default function MyTrips() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user trips
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    getTripsForUser(user.email)
      .then((data) => {
        setTrips(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trips:", err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <p className="p-10 text-center text-gray-600">Loading your trips...</p>;
  }

  if (!user?.email) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-700 text-lg">Please log in to view your trips.</p>
        <Link
          to="/login"
          className="mt-4 inline-block px-5 py-2 bg-emerald-600 text-white rounded-lg"
        >
          Login
        </Link>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No trips found</h2>
        <p className="text-gray-600">Start planning your first trip!</p>
        <Link
          to="/trips"
          className="mt-4 inline-block px-5 py-2 bg-emerald-600 text-white rounded-lg"
        >
          Plan a Trip
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        My Trips ✈️
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              {trip.destination}
            </h3>

            <div className="mt-3 space-y-1 text-gray-600">
              <p><strong>Days:</strong> {trip.days}</p>
              <p><strong>Budget:</strong> {trip.budget}</p>
              <p><strong>Travel Type:</strong> {trip.travelType}</p>
              <p><strong>Date:</strong> {trip.startDate}</p>
            </div>

            <div className="mt-5">
              <Link
                to="/results"
                state={{ ...trip }}
                className="text-emerald-600 font-semibold hover:underline"
              >
                View Trip →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
