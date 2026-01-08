package com.cathay.agentapi.service;

import com.cathay.agentapi.dto.AgentDTO;
import com.cathay.agentapi.model.Agent;
import com.cathay.agentapi.repository.AgentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings("unchecked")
class AgentServiceTest {

    @Mock
    private AgentRepository agentRepository;

    @InjectMocks
    private AgentService agentService;

    private Agent testAgent;

    @BeforeEach
    void setUp() {
        testAgent = new Agent();
        testAgent.setId(1L);
        testAgent.setBranch("VEY");
        testAgent.setAgentCode("00000116700");
        testAgent.setCompanyName("Agent 00003700");
        testAgent.setCompanyNameLocal("Agent Ltd");
        testAgent.setShortName("EHQ");
        testAgent.setAgentType("FVN");
        testAgent.setAgentStatus("Active");
    }

    @Test
    void testSearchAgents_NoFilters() {
        // Given
        List<Agent> agents = Arrays.asList(testAgent);
        Page<Agent> agentPage = new PageImpl<>(agents, PageRequest.of(0, 20), 1);
        when(agentRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(agentPage);

        // When
        Page<AgentDTO> result = agentService.searchAgents(null, null, null, null, null, 0, 20);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        assertEquals("VEY", result.getContent().get(0).getBranch());
        assertEquals("00000116700", result.getContent().get(0).getAgentCode());
        verify(agentRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));
    }

    @Test
    void testSearchAgents_WithLocationFilter() {
        // Given
        List<Agent> agents = Arrays.asList(testAgent);
        Page<Agent> agentPage = new PageImpl<>(agents, PageRequest.of(0, 20), 1);
        when(agentRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(agentPage);

        // When
        Page<AgentDTO> result = agentService.searchAgents("VEY", null, null, null, null, 0, 20);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(agentRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));
    }

    @Test
    void testSearchAgents_WithCompanyFilter() {
        // Given
        List<Agent> agents = Arrays.asList(testAgent);
        Page<Agent> agentPage = new PageImpl<>(agents, PageRequest.of(0, 20), 1);
        when(agentRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(agentPage);

        // When
        Page<AgentDTO> result = agentService.searchAgents(null, "Agent", null, null, null, 0, 20);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(agentRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));
    }

    @Test
    void testSearchAgents_WithAgentTypeFilter() {
        // Given
        List<Agent> agents = Arrays.asList(testAgent);
        Page<Agent> agentPage = new PageImpl<>(agents, PageRequest.of(0, 20), 1);
        when(agentRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(agentPage);

        // When
        Page<AgentDTO> result = agentService.searchAgents(null, null, "FVN", null, null, 0, 20);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(agentRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));
    }

    @Test
    void testSearchAgents_WithAgentStatusFilter() {
        // Given
        List<Agent> agents = Arrays.asList(testAgent);
        Page<Agent> agentPage = new PageImpl<>(agents, PageRequest.of(0, 20), 1);
        when(agentRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(agentPage);

        // When
        Page<AgentDTO> result = agentService.searchAgents(null, null, null, "Active", null, 0, 20);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(agentRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));
    }

    @Test
    void testSearchAgents_WithSearchTerm() {
        // Given
        List<Agent> agents = Arrays.asList(testAgent);
        Page<Agent> agentPage = new PageImpl<>(agents, PageRequest.of(0, 20), 1);
        when(agentRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(agentPage);

        // When
        Page<AgentDTO> result = agentService.searchAgents(null, null, null, null, "00000116700", 0, 20);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(agentRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));
    }

    @Test
    void testSearchAgents_WithMultipleFilters() {
        // Given
        List<Agent> agents = Arrays.asList(testAgent);
        Page<Agent> agentPage = new PageImpl<>(agents, PageRequest.of(0, 20), 1);
        when(agentRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(agentPage);

        // When
        Page<AgentDTO> result = agentService.searchAgents("VEY", "Agent", "FVN", "Active", null, 0, 20);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(agentRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));
    }

    @Test
    void testSearchAgents_Pagination() {
        // Given
        List<Agent> agents = Arrays.asList(testAgent);
        Page<Agent> agentPage = new PageImpl<>(agents, PageRequest.of(1, 10), 25);
        when(agentRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(agentPage);

        // When
        Page<AgentDTO> result = agentService.searchAgents(null, null, null, null, null, 1, 10);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        assertEquals(1, result.getNumber());
        assertEquals(10, result.getSize());
        assertEquals(25, result.getTotalElements());
        verify(agentRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));
    }
}
