// FlightCard.tsx
import React from "react";
import { Flight } from '/home/red/Coding/tamuhack2025-travlr/src/lib/types.ts';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Flight {flight.flightNumber}</h2>
      <div className="text-sm mb-2"><strong>Departure:</strong> {flight.departureLocation} ({flight.departureAirport}) at {flight.departureTime}</div>
      <div className="text-sm mb-2"><strong>Arrival:</strong> {flight.arrivalLocation} ({flight.arrivalAirport}) at {flight.arrivalTime}</div>
      <div className="text-sm mb-2"><strong>Gate:</strong> {flight.gate}</div>
      <div className="text-sm"><strong>Status:</strong> {flight.status}</div>
    </div>
  );
};

export default FlightCard;
