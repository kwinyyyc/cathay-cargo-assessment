"use client";

import { Agent, AgentResponse } from "./agent.types";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface AgentListProps {
  data: AgentResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function AgentList({
  data,
  isLoading,
  error,
  sortBy,
  onSortChange,
}: AgentListProps) {
  const totalElements = data?.totalElements ?? 0;
  const page = data?.page ?? 0;
  const size = data?.size ?? 20;
  const start = totalElements === 0 ? 0 : page * size + 1;
  const end = Math.min(totalElements, (page + 1) * size);

  const getStatusBadgeClass = (status: string) => {
    if (status === "Active") {
      return "bg-green-100 text-green-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error m-4 shadow-lg">
        <span>Error loading agents. Please try again later.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary and sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
        <div className="text-base-content/70 mb-2 sm:mb-0">
          {totalElements > 0
            ? `${start}-${end} of ${totalElements} agents`
            : "No agents found"}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base-content/70">Sort by</span>
          <select
            className="select select-bordered select-sm bg-base-100"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="agentCode-asc">Agent code ascending (A-Z)</option>
            <option value="agentCode-desc">Agent code descending (Z-A)</option>
            <option value="companyName-asc">
              Company name ascending (A-Z)
            </option>
            <option value="companyName-desc">
              Company name descending (Z-A)
            </option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-base-100 border border-base-300 rounded-lg overflow-x-auto">
        <table className="table w-full text-sm">
          <thead>
            <tr className="border-b border-base-300">
              <th className="font-semibold text-base-content">Branch</th>
              <th className="font-semibold text-base-content">Agent Code</th>
              <th className="font-semibold text-base-content">Company name</th>
              <th className="font-semibold text-base-content">
                Company name - in Local Language
              </th>
              <th className="font-semibold text-base-content">Short name</th>
              <th className="font-semibold text-base-content">Agent type</th>
              <th className="font-semibold text-base-content">Agent status</th>
              <th className="font-semibold text-base-content"></th>
            </tr>
          </thead>
          <tbody>
            {data?.content.map((agent) => (
              <tr key={agent.id} className="border-b border-base-200">
                <td>{agent.branch}</td>
                <td>
                  <Link
                    href={`#`}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    {agent.agentCode}
                  </Link>
                </td>
                <td>{agent.companyName}</td>
                <td>{agent.companyNameLocal ?? "N/A"}</td>
                <td>{agent.shortName}</td>
                <td>{agent.agentType}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      agent.agentStatus
                    )}`}
                  >
                    {agent.agentStatus}
                  </span>
                </td>
                <td>
                  <button className="btn btn-ghost btn-xs">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
