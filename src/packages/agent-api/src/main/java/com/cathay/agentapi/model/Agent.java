package com.cathay.agentapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "agents")
public class Agent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 3)
    private String branch;

    @Column(nullable = false, unique = true, length = 20)
    private String agentCode;

    @Column(nullable = false)
    private String companyName;

    private String companyNameLocal;

    @Column(nullable = false)
    private String shortName;

    @Column(nullable = false)
    private String agentType;

    @Column(nullable = false)
    private String agentStatus;

    public Agent() {
    }

    public Agent(String branch, String agentCode, String companyName, String companyNameLocal,
                 String shortName, String agentType, String agentStatus) {
        this.branch = branch;
        this.agentCode = agentCode;
        this.companyName = companyName;
        this.companyNameLocal = companyNameLocal;
        this.shortName = shortName;
        this.agentType = agentType;
        this.agentStatus = agentStatus;
    }

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
