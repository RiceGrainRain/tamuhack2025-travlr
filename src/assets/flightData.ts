// flightData.ts
import { Flight } from '/home/red/Coding/tamuhack2025-travlr/src/lib/types.ts';

export const flights: Flight[] = [
  {
    flightNumber: "AA1234",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    departureLocation: "New York, USA",
    arrivalLocation: "Los Angeles, USA",
    departureTime: "2025-01-26 08:30",
    arrivalTime: "2025-01-26 11:30",
    gate: "A12",
    status: "On Time"
  },
  {
    flightNumber: "UA5678",
    departureAirport: "ORD",
    arrivalAirport: "SFO",
    departureLocation: "Chicago, USA",
    arrivalLocation: "San Francisco, USA",
    departureTime: "2025-01-26 09:00",
    arrivalTime: "2025-01-26 11:45",
    gate: "B22",
    status: "Delayed"
  },
  {
    flightNumber: "DL9012",
    departureAirport: "ATL",
    arrivalAirport: "MIA",
    departureLocation: "Atlanta, USA",
    arrivalLocation: "Miami, USA",
    departureTime: "2025-01-26 07:45",
    arrivalTime: "2025-01-26 09:00",
    gate: "C15",
    status: "On Time"
  },
  {
    flightNumber: "SW3456",
    departureAirport: "SEA",
    arrivalAirport: "LAS",
    departureLocation: "Seattle, USA",
    arrivalLocation: "Las Vegas, USA",
    departureTime: "2025-01-26 10:00",
    arrivalTime: "2025-01-26 12:00",
    gate: "D10",
    status: "Cancelled"
  }
];
