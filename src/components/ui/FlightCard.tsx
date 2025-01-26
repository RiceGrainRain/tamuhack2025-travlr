// FlightCard.tsx
import React from "react";
import { Flight } from '/home/red/Coding/tamuhack2025-travlr/src/lib/types.ts';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 p-8 shadow-lg max-w-xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-red-500"></div>

      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex justify-between items-center">
        <span>Flight {flight.flightNumber}</span>
        <span className="text-lg text-gray-600">{flight.status}</span>
      </h2>

      <div className="mb-4">
        <div className="text-sm font-semibold text-gray-600 mb-2">Departure</div>
        <div className="text-xl font-medium text-gray-800">{flight.departureLocation} ({flight.departureAirport})</div>
        <div className="text-sm text-gray-500">{flight.departureTime}</div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-semibold text-gray-600 mb-2">Arrival</div>
        <div className="text-xl font-medium text-gray-800">{flight.arrivalLocation} ({flight.arrivalAirport})</div>
        <div className="text-sm text-gray-500">{flight.arrivalTime}</div>
      </div>


      <div className="mb-4">
        <div className="text-sm font-semibold text-gray-600 mb-2">Gate</div>
        <div className="text-xl font-medium text-gray-800">{flight.gate}</div>
      </div>


      <div className="flex justify-between space-x-4 mt-6">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition ease-in-out duration-150 transform hover:scale-105">
          Flyer Check In
        </button>
        <button className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition ease-in-out duration-150 transform hover:scale-105">
          Staff Check In
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
