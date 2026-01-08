package com.cathay.agentapi.service;

import com.cathay.agentapi.dto.AgentDTO;
import com.cathay.agentapi.model.Agent;
import com.cathay.agentapi.repository.AgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AgentService {

    private final AgentRepository agentRepository;

    @Autowired
    public AgentService(AgentRepository agentRepository) {
        this.agentRepository = agentRepository;
    }

    public Page<AgentDTO> searchAgents(
            String location,
            String company,
            String agentType,
            String agentStatus,
            String search,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<Agent> spec = Specification.where(null);

        if (location != null && !location.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.upper(root.get("branch")), location.toUpperCase()));
        }
        if (company != null && !company.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.upper(root.get("companyName")), "%" + company.toUpperCase() + "%"));
        }
        if (agentType != null && !agentType.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.upper(root.get("agentType")), agentType.toUpperCase()));
        }
        if (agentStatus != null && !agentStatus.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.upper(root.get("agentStatus")), agentStatus.toUpperCase()));
        }
        if (search != null && !search.isBlank()) {
            String like = "%" + search.toUpperCase() + "%";
            spec = spec.and((root, query, cb) -> cb.or(
                    cb.like(cb.upper(root.get("agentCode")), like),
                    cb.like(cb.upper(root.get("companyName")), like)
            ));
        }

        Page<Agent> agentPage = agentRepository.findAll(spec, pageable);
        return agentPage.map(AgentDTO::new);
    }
}
