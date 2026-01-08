"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchForm from "./search-form.component";
import FlightList from "./flight-list.component";
import { searchFlights } from "./flight.service";
import { Flight } from "./flight.model";

export default function SearchFlightsPage() {
  const [searchParams, setSearchParams] = useState<{
    origin?: string;
    destination?: string;
    flightNumber?: string;
  }>({});

  const { data, isLoading, error } = useQuery<Flight[]>({
    queryKey: ["flights", "search", searchParams],
    queryFn: () =>
      searchFlights(
        searchParams.origin,
        searchParams.destination,
        searchParams.flightNumber
      ),
    enabled: Object.keys(searchParams).length > 0,
  });

  const handleSearch = (params: {
    origin?: string;
    destination?: string;
    flightNumber?: string;
  }) => {
    setSearchParams(params);
  };

  const hasSearched = Object.keys(searchParams).length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-left">
        <h2 className="text-3xl font-semibold mb-2 text-base-content">
          Check flight status
        </h2>
      </div>

      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error mb-4 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error searching flights. Please try again later.</span>
        </div>
      )}

      {hasSearched && !isLoading && !error && data && (
        <FlightList flights={data} />
      )}

      {!hasSearched && (
        <div className="card bg-base-100 shadow-lg mt-4">
          <div className="card-body">
            <p className="text-center text-base-content/70">
              Enter your criteria above and select &quot;Search flights&quot; to
              view flight status.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
