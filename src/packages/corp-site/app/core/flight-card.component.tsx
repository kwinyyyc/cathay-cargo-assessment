"use client";

import { useState, useEffect } from "react";
import { Flight } from "../flight/flight.model";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

interface FlightCardProps {
  flight: Flight;
  expanded?: boolean;
}

export default function FlightCard({
  flight,
  expanded = false,
}: FlightCardProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const departureDate = new Date(flight.departureTime);
  const arrivalDate = new Date(flight.arrivalTime);
  const isNextDay =
    arrivalDate.getDate() !== departureDate.getDate() ||
    arrivalDate.getMonth() !== departureDate.getMonth() ||
    arrivalDate.getFullYear() !== departureDate.getFullYear();

  const aircraftType = "Wide body";
  const aircraftModel = "359";

  return (
    <div className="bg-base-100 border border-base-300 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-6">
        <div className="basis-[25%]">
          <h3 className="text-lg font-semibold text-base-content">
            {flight.flightNumber}
          </h3>
        </div>

        <div className="flex basis-[50%]">
          <div className="flex-shrink-0 min-w-[120px]">
            <div className="text-primary-content font-semibold text-lg">
              {formatTime(flight.departureTime)} {flight.origin}
            </div>
            <div className="text-sm text-base-content/70 mt-1">Scheduled</div>
            <div className="text-xs text-base-content/60 mt-1">
              {aircraftType}, {aircraftModel}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center px-4">
            <div className="flex-1 h-px bg-base-300"></div>
            <PaperAirplaneIcon className="h-5 w-5 mx-2 text-base-content/40" />
            <div className="flex-1 h-px bg-base-300"></div>
          </div>

          <div className="flex-shrink-0 min-w-[120px]">
            <div className="text-primary-content font-semibold text-lg">
              {formatTime(flight.arrivalTime)}
              {isNextDay && <span className="ml-1">+1</span>}{" "}
              {flight.destination}
            </div>
            <div className="text-sm text-base-content/70 mt-1">Scheduled</div>
            {isExpanded && (
              <button
                onClick={() => setIsExpanded(false)}
                className="text-primary-content hover:underline text-sm mt-2"
              >
                Show less
              </button>
            )}
            {!isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-primary-content hover:underline text-sm mt-2"
              >
                Show more
              </button>
            )}
          </div>
        </div>

        <div className="basis-[25%] flex items-center gap-2 min-w-[150px] justify-end">
          <div className="h-2 w-2 rounded-full bg-primary-content"></div>
          <span className="text-primary-content text-sm font-medium">
            Not yet departed
          </span>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-base-300 pl-24">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-base-content/70 mb-1">Departure Date</p>
              <p className="font-medium">{formatDate(flight.departureTime)}</p>
            </div>
            <div>
              <p className="text-base-content/70 mb-1">Arrival Date</p>
              <p className="font-medium">{formatDate(flight.arrivalTime)}</p>
            </div>
            <div>
              <p className="text-base-content/70 mb-1">Available Seats</p>
              <p className="font-medium">{flight.availableSeats}</p>
            </div>
            <div>
              <p className="text-base-content/70 mb-1">Price</p>
              <p className="font-medium">${flight.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
