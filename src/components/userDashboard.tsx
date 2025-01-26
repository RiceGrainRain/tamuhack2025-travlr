import React from "react";
import { travelInfo } from "../../../tamuhack2025-travlr/src/assets/travelInfo.ts";

const UserDashboard: React.FC = () => {
    const arrivalAirport = "LAX"; // Example: Get dynamically from flight data
    const info = travelInfo[arrivalAirport];
  
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-8 p-8">
          {/* Left Section */}
          <div className="flex flex-col gap-6 w-full md:w-1/3">
            {/* Personalized Travel Information Card */}
            <div className="bg-white border-2 border-blue-500 rounded-3xl shadow-xl p-6 relative">
              <div className="absolute -top-4 -left-4 bg-blue-500 text-white text-sm px-3 py-1 rounded-full shadow-lg uppercase">
                Travel Info
              </div>
              <h2 className="text-2xl font-bold text-blue-500 mb-4">Welcome to {arrivalAirport}!</h2>
              <p className="text-lg font-medium mb-4">Weather: {info.weather.temperature}, {info.weather.condition}</p>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-blue-500">Tourist Destinations:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {info.touristDestinations.map((destination, index) => (
                    <li key={index}>{destination}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-blue-500">Nearby Restaurants:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {info.nearbyRestaurants.map((restaurant, index) => (
                    <li key={index}>
                      <span className="font-medium">{restaurant.name}</span> ({restaurant.cuisine}) - Rating: {restaurant.rating}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-sm italic text-gray-500">{info.localTips}</p>
            </div>
  
            {/* Wellness Check Survey Card */}
            <div className="bg-white border-2 border-red-500 rounded-3xl shadow-xl p-6 relative">
              <div className="absolute -top-4 -left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full shadow-lg uppercase">
                Wellness Check
              </div>
              <h2 className="text-2xl font-bold text-red-500 mb-4">How are you feeling?</h2>
              <p className="text-lg font-medium mb-4">Please let us know how you're feeling during your journey:</p>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mood:</label>
                  <select className="w-full rounded-lg border-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="">Select an option</option>
                    <option value="good">Good</option>
                    <option value="okay">Okay</option>
                    <option value="not_good">Not Good</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional Comments:</label>
                  <textarea
                    className="w-full rounded-lg border-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                    placeholder="Type here..."
                  ></textarea>
                </div>
                <button className="w-full bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-red-600">
                  Submit
                </button>
              </form>
            </div>
          </div>
  
          {/* Right Section */}
          <div className="flex-1 bg-gradient-to-b from-blue-50 to-blue-100 rounded-3xl shadow-xl p-6 relative">
            <div className="absolute -top-4 -left-4 bg-blue-500 text-white text-sm px-3 py-1 rounded-full shadow-lg uppercase">
              AI Assistant
            </div>
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Your Personal Assistant</h2>
            <div className="mt-4 border-2 border-blue-500 rounded-lg p-4 h-96 flex items-center justify-center">
              {/* Chatbot placeholder */}
              <p className="text-gray-500 italic">Chatbox coming soon...</p>
            </div>
          </div>
        </div>
  
        {/* Bottom Section */}
        <div className="flex-1 bg-white border-t-4 border-blue-500 rounded-t-3xl shadow-xl p-6 mt-4">
          <h2 className="text-2xl font-bold text-blue-500">In-flight Entertainment</h2>
          <p className="text-gray-700 mt-2">Coming soon: Movies, music, games, and more to enhance your flight experience!</p>
        </div>
      </div>
    );
  };
  
  export default UserDashboard;