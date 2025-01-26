// FlightList.tsx
import React from "react";
import { flights } from '/home/red/Coding/tamuhack2025-travlr/src/assets/flightData.ts';
import FlightCard from '/home/red/Coding/tamuhack2025-travlr/src/components/ui/FlightCard.tsx';

const FlightList: React.FC = () => {
  return (
    <div className="space-y-6">
      {flights.map((flight) => (
        <FlightCard key={flight.flightNumber} flight={flight} />
      ))}
    </div>
  );
};

export default FlightList;
