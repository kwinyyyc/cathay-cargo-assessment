package com.cathay.agentapi.controller;

import com.cathay.agentapi.dto.AgentDTO;
import com.cathay.agentapi.service.AgentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/agents")
public class AgentController {

    private final AgentService agentService;

    @Autowired
    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_read-agent')")
    public ResponseEntity<Map<String, Object>> getAgents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String agentType,
            @RequestParam(required = false) String agentStatus,
            @RequestParam(required = false) String search,
            HttpServletRequest request) {
        String apiVersion = (String) request.getAttribute("apiVersion");
        Page<AgentDTO> result = agentService.searchAgents(
                location,
                company,
                agentType,
                agentStatus,
                search,
                page,
                size);

        Map<String, Object> body = new HashMap<>();
        body.put("content", result.getContent());
        body.put("totalElements", result.getTotalElements());
        body.put("totalPages", result.getTotalPages());
        body.put("page", result.getNumber());
        body.put("size", result.getSize());

        return ResponseEntity.ok()
                .header("API-Version", apiVersion != null ? apiVersion : "v1")
                .body(body);
    }
}
