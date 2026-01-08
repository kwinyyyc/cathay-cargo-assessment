package com.cathay.agentapi.dto;

import com.cathay.agentapi.model.Agent;

public class AgentDTO {
    private Long id;
    private String branch;
    private String agentCode;
    private String companyName;
    private String companyNameLocal;
    private String shortName;
    private String agentType;
    private String agentStatus;

    public AgentDTO() {
    }

    public AgentDTO(Agent agent) {
        this.id = agent.getId();
        this.branch = agent.getBranch();
        this.agentCode = agent.getAgentCode();
        this.companyName = agent.getCompanyName();
        this.companyNameLocal = agent.getCompanyNameLocal();
        this.shortName = agent.getShortName();
        this.agentType = agent.getAgentType();
        this.agentStatus = agent.getAgentStatus();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getAgentCode() {
        return agentCode;
    }

    public void setAgentCode(String agentCode) {
        this.agentCode = agentCode;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyNameLocal() {
        return companyNameLocal;
    }

    public void setCompanyNameLocal(String companyNameLocal) {
        this.companyNameLocal = companyNameLocal;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getAgentType() {
        return agentType;
    }

    public void setAgentType(String agentType) {
        this.agentType = agentType;
    }

    public String getAgentStatus() {
        return agentStatus;
    }

    public void setAgentStatus(String agentStatus) {
        this.agentStatus = agentStatus;
    }
}

