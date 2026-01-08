"use client";

import { useState } from "react";
import { Flight } from "./flight.model";
import FlightCard from "../core/flight-card.component";

interface FlightListProps {
  flights: Flight[];
}

export default function FlightList({ flights }: FlightListProps) {
  const [allExpanded, setAllExpanded] = useState(false);

  if (flights.length === 0) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <p className="text-center text-base-content/70">
            No flights available at this time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-base-content">
          Flight status results
        </h3>
      </div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-primary-content font-medium">
          {flights.length} flight{flights.length !== 1 ? "s" : ""} result
          {flights.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={() => setAllExpanded(!allExpanded)}
          className="text-primary-content hover:underline text-sm font-medium"
        >
          Expand all flight details
        </button>
      </div>
      <div className="grid gap-4">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} expanded={allExpanded} />
        ))}
      </div>
    </section>
  );
}
