"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchForm from "./search-form.component";
import AgentList from "./agent-list.component";
import { AgentResponse } from "./agent.types";

const AGENT_API_URL =
  process.env.NEXT_PUBLIC_AGENT_API_URL || "http://localhost:8081";

export default function AgentPage() {
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [agentType, setAgentType] = useState("");
  const [agentStatus, setAgentStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [effectiveSearch, setEffectiveSearch] = useState("");
  const [sortBy, setSortBy] = useState("agentCode-asc");

  const { data, isLoading, error } = useQuery<AgentResponse>({
    queryKey: [
      "agents",
      page,
      size,
      location,
      company,
      agentType,
      agentStatus,
      effectiveSearch,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("size", size.toString());
      if (location) params.append("location", location);
      if (company) params.append("company", company);
      if (agentType) params.append("agentType", agentType);
      if (agentStatus) params.append("agentStatus", agentStatus);
      if (effectiveSearch) params.append("search", effectiveSearch);

      const res = await fetch(
        `${AGENT_API_URL}/api/agents?${params.toString()}`,
        {
          headers: {
            "API-Version": "v1",
          },
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to load agents");
      }
      return res.json();
    },
  });

  const handleReset = () => {
    setLocation("");
    setCompany("");
    setAgentType("");
    setAgentStatus("");
    setSearchTerm("");
    setEffectiveSearch("");
    setPage(0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setEffectiveSearch(searchTerm.trim());
    setPage(0);
  };

  return (
    <main className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-base-300">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Agent management
          </h1>
          <p className="text-sm text-base-content/70">
            Internal staff can view and manage the agent profiles below.
          </p>
        </div>

        {/* Agent List Section */}
        <section>
          <h2 className="text-xl font-bold text-base-content mb-4">
            Agent list
          </h2>

          {/* Search Form */}
          <div className="mb-6">
            <SearchForm
              location={location}
              company={company}
              agentType={agentType}
              agentStatus={agentStatus}
              searchTerm={searchTerm}
              onLocationChange={(value) => {
                setLocation(value);
                setPage(0);
              }}
              onCompanyChange={(value) => {
                setCompany(value);
                setPage(0);
              }}
              onAgentTypeChange={(value) => {
                setAgentType(value);
                setPage(0);
              }}
              onAgentStatusChange={(value) => {
                setAgentStatus(value);
                setPage(0);
              }}
              onSearchChange={setSearchTerm}
              onReset={handleReset}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          </div>

          {/* Agent List */}
          <AgentList
            data={data}
            isLoading={isLoading}
            error={error}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex justify-end items-center gap-2 mt-4 text-sm">
              <button
                className="btn btn-ghost btn-xs"
                disabled={page === 0 || isLoading}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                Prev
              </button>
              <span>
                Page {page + 1} of {data.totalPages}
              </span>
              <button
                className="btn btn-ghost btn-xs"
                disabled={page + 1 >= data.totalPages || isLoading}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
