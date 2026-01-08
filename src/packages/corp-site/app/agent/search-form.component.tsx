"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface SearchFormProps {
  location: string;
  company: string;
  agentType: string;
  agentStatus: string;
  searchTerm: string;
  onLocationChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onAgentTypeChange: (value: string) => void;
  onAgentStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onReset: () => void;
  onSearch: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export default function SearchForm({
  location,
  company,
  agentType,
  agentStatus,
  searchTerm,
  onLocationChange,
  onCompanyChange,
  onAgentTypeChange,
  onAgentStatusChange,
  onSearchChange,
  onReset,
  onSearch,
  isLoading = false,
}: SearchFormProps) {
  return (
    <div className="space-y-4">
      {/* Filter by section */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-base-content">Filter by</span>
        <div className="relative">
          <select
            className="select select-bordered select-sm pr-8 appearance-none bg-base-100"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            disabled={isLoading}
          >
            <option value="">Location</option>
            <option value="VEY">VEY</option>
            <option value="YOU">YOU</option>
            <option value="HKG">HKG</option>
          </select>
          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/50 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            className="select select-bordered select-sm pr-8 appearance-none bg-base-100"
            value={company}
            onChange={(e) => onCompanyChange(e.target.value)}
            disabled={isLoading}
          >
            <option value="">Company</option>
          </select>
          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/50 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            className="select select-bordered select-sm pr-8 appearance-none bg-base-100"
            value={agentType}
            onChange={(e) => onAgentTypeChange(e.target.value)}
            disabled={isLoading}
          >
            <option value="">Agent type</option>
            <option value="FVN">FVN</option>
            <option value="BAI">BAI</option>
          </select>
          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/50 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            className="select select-bordered select-sm pr-8 appearance-none bg-base-100"
            value={agentStatus}
            onChange={(e) => onAgentStatusChange(e.target.value)}
            disabled={isLoading}
          >
            <option value="">Agent status</option>
            <option value="Active">Active</option>
            <option value="Rejected">Rejected</option>
          </select>
          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/50 pointer-events-none" />
        </div>
        <button
          type="button"
          onClick={onReset}
          disabled={isLoading}
          className="btn btn-ghost btn-sm gap-2 ml-auto"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Reset all filters
        </button>
      </div>

      {/* Search bar */}
      <div className="flex justify-end">
        <form onSubmit={onSearch} className="w-full sm:w-auto">
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text text-sm text-base-content/70">
                Search for an agent by no. or company name.
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="input input-bordered input-sm w-full sm:w-80 pr-10"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search"
                disabled={isLoading}
              />
              <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/50 pointer-events-none" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

