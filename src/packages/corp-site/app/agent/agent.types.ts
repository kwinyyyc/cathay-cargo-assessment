export interface Agent {
  id: number;
  branch: string;
  agentCode: string;
  companyName: string;
  companyNameLocal: string | null;
  shortName: string;
  agentType: string;
  agentStatus: string;
}

export interface AgentResponse {
  content: Agent[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface AgentSearchParams {
  location?: string;
  company?: string;
  agentType?: string;
  agentStatus?: string;
  search?: string;
  page: number;
  size: number;
}
