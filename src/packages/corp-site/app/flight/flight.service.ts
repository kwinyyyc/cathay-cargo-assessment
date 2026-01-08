import { Flight } from "./flight.model";

export async function fetchFlights(): Promise<Flight[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const response = await fetch(`${apiUrl}/api/flights`, {
    headers: {
      "API-Version": "v1",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch flights");
  }

  return response.json();
}

export async function searchFlights(
  origin?: string,
  destination?: string,
  flightNumber?: string
): Promise<Flight[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  // If flight number is provided, fetch all flights and filter client-side
  // (API doesn't have flight number search endpoint)
  if (flightNumber) {
    const allFlights = await fetchFlights();
    return allFlights.filter((flight) =>
      flight.flightNumber.toUpperCase().includes(flightNumber.toUpperCase())
    );
  }

  // Otherwise use the search endpoint with origin/destination
  const params = new URLSearchParams();
  if (origin) params.append("origin", origin);
  if (destination) params.append("destination", destination);

  const url = `${apiUrl}/api/flights/search?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      "API-Version": "v1",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to search flights");
  }

  return response.json();
}
