import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { saveTripToDB } from "../services/tripService";

export default function Trip() {
  const [cities, setCities] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedTravelType, setSelectedTravelType] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth(); 

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" }),
    })
      .then((res) => res.json())
      .then((data) => setCities(data.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("pendingTripForm");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      reset({
        destination: parsed.destination || "",
        startDate: parsed.startDate || "",
        days: parsed.days || "",
      });

      if (parsed.budget) setSelectedBudget(parsed.budget);
      if (parsed.travelType) setSelectedTravelType(parsed.travelType);
    } catch (err) {
      console.error("Failed to load saved trip form:", err);
    }
  }, [reset]);

  const onSubmit = async (data) => { 
    const { destination, days, startDate } = data;

    if (
      !destination ||
      !days ||
      !startDate ||
      !selectedBudget ||
      !selectedTravelType
    ) {
      alert("Please fill all details!");
      return;
    }

    const tripPayload = {
      destination,
      days,
      startDate,
      budget: selectedBudget,
      travelType: selectedTravelType,
    };

    if (!isAuthenticated) {
      localStorage.setItem("pendingTripForm", JSON.stringify(tripPayload));
      navigate("/login", { state: { from: "/trips" } });
      return;
    }

    setLoading(true);

    try {
      const newTripId = await saveTripToDB(tripPayload, user.email);
      console.log("Trip saved with ID:", newTripId);

      localStorage.removeItem("pendingTripForm");

      navigate("/results", {
        state: { ...tripPayload, id: newTripId },
      });

      reset();
      setSelectedBudget("");
      setSelectedTravelType("");
    } catch (error) {
      console.error("Failed to save trip:", error);
      alert("There was an error saving your trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1549887534-3db1bd59dcca?auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      <div className="bg-white/80 backdrop-blur-md w-[80%] max-w-5xl rounded-2xl p-10 shadow-xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Plan Your Perfect India Trip 🌴
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Destination */}
          <div>
            <label className="font-semibold text-lg mb-2 block">
              Destination
            </label>
            <select
              {...register("destination", { required: true })}
              className="w-full border rounded-xl px-5 py-3"
            >
              <option value="">Select City</option>
              {cities.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Start date */}
          <div>
            <label className="font-semibold text-lg mb-2 block">
              Trip Start Date
            </label>
            <input
              type="date"
              {...register("startDate", { required: true })}
              className="w-full border rounded-xl px-5 py-3"
            />
          </div>

          {/* Days */}
          <div>
            <label className="font-semibold text-lg mb-2 block">
              Number of Days
            </label>
            <input
              type="number"
              {...register("days", { required: true })}
              placeholder="e.g., 5"
              className="w-full border rounded-xl px-5 py-3"
              min={1}
            />
          </div>

          {/* Budget */}
          <div>
            <label className="font-semibold text-lg mb-3 block">Budget</label>
            <div className="grid grid-cols-3 gap-4">
              {["Low", "Medium", "High"].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelectedBudget(b)}
                  className={`py-3 rounded-xl border text-sm font-medium ${
                    selectedBudget === b
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Travel type */}
          <div>
            <label className="font-semibold text-lg mb-3 block">
              Who are you travelling with?
            </label>
            <div className="grid grid-cols-4 gap-4">
              {["Solo", "Couple", "Family", "Friends"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTravelType(t)}
                  className={`py-3 rounded-xl border text-sm font-medium ${
                    selectedTravelType === t
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl"
          >
            {loading ? "Generating Trip..." : "Generate My Trip 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}
