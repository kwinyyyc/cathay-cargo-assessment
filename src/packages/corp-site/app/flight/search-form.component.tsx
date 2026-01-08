"use client";

import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";

interface SearchFormProps {
  onSearch: (params: {
    origin?: string;
    destination?: string;
    flightNumber?: string;
  }) => void;
  isLoading?: boolean;
}

type SearchMode = "flightNumber" | "airport" | "route";

export default function SearchForm({
  onSearch,
  isLoading = false,
}: SearchFormProps) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [status, setStatus] = useState("departing");
  const [date, setDate] = useState("2025-12-15");
  const [mode, setMode] = useState<SearchMode>("flightNumber");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      origin: mode !== "flightNumber" ? origin.trim() || undefined : undefined,
      destination:
        mode === "route" ? destination.trim() || undefined : undefined,
      flightNumber:
        mode === "flightNumber" ? flightNumber.trim() || undefined : undefined,
    });
  };

  const handleReset = () => {
    setOrigin("");
    setDestination("");
    setFlightNumber("");
    setStatus("departing");
    setDate("2025-12-15");
    onSearch({});
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-base-100 mb-6 border border-gray-200">
      <div className="space-y-6">
        <div className="flex border-b border-base-300 px-4">
          <button
            role="tab"
            type="button"
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${
              mode === "flightNumber"
                ? "text-primary-content"
                : "text-base-content/70 hover:text-base-content"
            }`}
            onClick={() => setMode("flightNumber")}
          >
            Search by flight number
            {mode === "flightNumber" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-content"></div>
            )}
          </button>
          <button
            role="tab"
            type="button"
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${
              mode === "airport"
                ? "text-primary-content"
                : "text-base-content/70 hover:text-base-content"
            }`}
            onClick={() => setMode("airport")}
          >
            Search by airport
            {mode === "airport" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-content"></div>
            )}
          </button>
          <button
            role="tab"
            type="button"
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${
              mode === "route"
                ? "text-primary-content"
                : "text-base-content/70 hover:text-base-content"
            }`}
            onClick={() => setMode("route")}
          >
            Search by route
            {mode === "route" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-content"></div>
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "flightNumber" && (
            <>
              <div className="form-control px-4">
                <label className="label">
                  <span className="label-text font-medium">Flight number</span>
                </label>
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    const filtered = value.replace(/[^A-Z0-9]/g, "");
                    setFlightNumber(filtered);
                  }}
                  placeholder="Enter your flight number"
                  className="input input-bordered w-full uppercase"
                  maxLength={10}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control px-4">
                  <label className="label">
                    <span className="label-text font-medium">Status</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="departing">Departing</option>
                    <option value="arriving">Arriving</option>
                  </select>
                </div>
                <div className="form-control px-4">
                  <label className="label">
                    <span className="label-text font-medium">Date</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="input input-bordered w-full pr-10"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {mode === "airport" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Airport</span>
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                  placeholder="e.g., HKG"
                  className="input input-bordered w-full uppercase"
                  maxLength={3}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="departing">Departing</option>
                  <option value="arriving">Arriving</option>
                </select>
              </div>
            </div>
          )}

          {mode === "route" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Origin</span>
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                  placeholder="e.g., HKG"
                  className="input input-bordered w-full uppercase"
                  maxLength={3}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Destination</span>
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value.toUpperCase())}
                  placeholder="e.g., BOM"
                  className="input input-bordered w-full uppercase"
                  maxLength={3}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="departing">Departing</option>
                  <option value="arriving">Arriving</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="submit"
              className="bg-[#006B6E] hover:bg-[#005A5D] rounded-none text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Searching...
                </>
              ) : (
                "Search flights"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
