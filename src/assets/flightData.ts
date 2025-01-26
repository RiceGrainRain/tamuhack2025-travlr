// flightData.ts
import { Flight } from '/home/red/Coding/tamuhack2025-travlr/src/lib/types.ts';

export const flights: Flight[] = [
  {
    flightNumber: "1234",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    departureLocation: "New York, USA",
    arrivalLocation: "Los Angeles, USA",
    departureTime: "2025-01-26 10:30",
    arrivalTime: "2025-01-26 5:00",
    gate: "B15",
    status: "On Time"
  },
  {
    flightNumber: "1543",
    departureAirport: "ORD",
    arrivalAirport: "SFO",
    departureLocation: "Chicago, USA",
    arrivalLocation: "San Francisco, USA",
    departureTime: "2025-01-26 12:30",
    arrivalTime: "2025-01-26 02:00",
    gate: "A10",
    status: "Delayed"
  },
  {
    flightNumber: "9632",
    departureAirport: "DEN",
    arrivalAirport: "MIA",
    departureLocation: "Atlanta, USA",
    arrivalLocation: "Miami, USA",
    departureTime: "2025-01-26 10:00",
    arrivalTime: "2025-01-26 02:00",
    gate: "B31",
    status: "On Time"
  }
];
