// personalizedTravelInfo.ts
export const travelInfo = {
    LAX: {
      weather: {
        temperature: "22°C",
        condition: "Sunny",
      },
      touristDestinations: [
        "Santa Monica Pier",
        "Hollywood Walk of Fame",
        "Griffith Observatory",
        "Rodeo Drive",
      ],
      nearbyRestaurants: [
        { name: "In-N-Out Burger", cuisine: "Fast Food", rating: 4.5 },
        { name: "The Ivy", cuisine: "American", rating: 4.3 },
        { name: "Republique", cuisine: "French", rating: 4.7 },
      ],
      localTips: "Traffic is heavy in Los Angeles; consider public transport or ridesharing for convenience.",
    },
    SFO: {
      weather: {
        temperature: "18°C",
        condition: "Partly Cloudy",
      },
      touristDestinations: [
        "Golden Gate Bridge",
        "Alcatraz Island",
        "Pier 39",
        "San Francisco Museum of Modern Art",
      ],
      nearbyRestaurants: [
        { name: "Tartine Bakery", cuisine: "Bakery", rating: 4.8 },
        { name: "Gary Danko", cuisine: "Fine Dining", rating: 4.9 },
        { name: "La Taqueria", cuisine: "Mexican", rating: 4.6 },
      ],
      localTips: "The weather can change quickly; carry a light jacket, even in summer.",
    },
    MIA: {
      weather: {
        temperature: "28°C",
        condition: "Sunny",
      },
      touristDestinations: [
        "South Beach",
        "Vizcaya Museum and Gardens",
        "Wynwood Walls",
        "Little Havana",
      ],
      nearbyRestaurants: [
        { name: "Joe's Stone Crab", cuisine: "Seafood", rating: 4.7 },
        { name: "Yardbird Southern Table & Bar", cuisine: "Southern", rating: 4.5 },
        { name: "El Palacio de los Jugos", cuisine: "Cuban", rating: 4.6 },
      ],
      localTips: "Stay hydrated and use sunscreen; the Miami sun can be intense.",
    },
    LAS: {
      weather: {
        temperature: "24°C",
        condition: "Clear",
      },
      touristDestinations: [
        "The Las Vegas Strip",
        "Bellagio Fountains",
        "Red Rock Canyon",
        "Fremont Street Experience",
      ],
      nearbyRestaurants: [
        { name: "Joël Robuchon", cuisine: "French Fine Dining", rating: 4.9 },
        { name: "Gordon Ramsay Hell's Kitchen", cuisine: "British/American", rating: 4.8 },
        { name: "Lotus of Siam", cuisine: "Thai", rating: 4.7 },
      ],
      localTips: "Explore beyond the Strip for a quieter and more authentic Vegas experience.",
    },
  };
  