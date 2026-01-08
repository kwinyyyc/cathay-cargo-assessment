package com.cathay.agentapi.controller;

import com.cathay.agentapi.dto.AgentDTO;
import com.cathay.agentapi.service.AgentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AgentController.class)
class AgentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AgentService agentService;

    private AgentDTO testAgentDTO;
    private Page<AgentDTO> testPage;

    @BeforeEach
    void setUp() {
        testAgentDTO = new AgentDTO();
        testAgentDTO.setId(1L);
        testAgentDTO.setBranch("VEY");
        testAgentDTO.setAgentCode("00000116700");
        testAgentDTO.setCompanyName("Agent 00003700");
        testAgentDTO.setCompanyNameLocal("Agent Ltd");
        testAgentDTO.setShortName("EHQ");
        testAgentDTO.setAgentType("FVN");
        testAgentDTO.setAgentStatus("Active");

        List<AgentDTO> agents = Arrays.asList(testAgentDTO);
        testPage = new PageImpl<>(agents, PageRequest.of(0, 20), 1);
    }

    @Test
    @WithMockUser(authorities = "SCOPE_read-agent")
    void testGetAgents_WithApiVersion() throws Exception {
        // Given
        when(agentService.searchAgents(any(), any(), any(), any(), any(), anyInt(), anyInt()))
                .thenReturn(testPage);

        // When & Then
        mockMvc.perform(get("/api/agents")
                .header("API-Version", "v1")
                .param("page", "0")
                .param("size", "20"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.content[0].agentCode").value("00000116700"))
                .andExpect(jsonPath("$.content[0].branch").value("VEY"))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.totalPages").value(1))
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.size").value(20))
                .andExpect(header().string("API-Version", "v1"));
    }

    @Test
    @WithMockUser(authorities = "SCOPE_read-agent")
    void testGetAgents_WithoutApiVersion() throws Exception {
        // Given
        when(agentService.searchAgents(any(), any(), any(), any(), any(), anyInt(), anyInt()))
                .thenReturn(testPage);

        // When & Then
        mockMvc.perform(get("/api/agents")
                .param("page", "0")
                .param("size", "20"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.content[0].agentCode").value("00000116700"))
                .andExpect(header().string("API-Version", "v1"));
    }

    @Test
    @WithMockUser(authorities = "SCOPE_read-agent")
    void testGetAgents_WithFilters() throws Exception {
        // Given
        when(agentService.searchAgents(eq("VEY"), eq("Agent"), eq("FVN"), eq("Active"), any(), anyInt(), anyInt()))
                .thenReturn(testPage);

        // When & Then
        mockMvc.perform(get("/api/agents")
                .header("API-Version", "v1")
                .param("page", "0")
                .param("size", "20")
                .param("location", "VEY")
                .param("company", "Agent")
                .param("agentType", "FVN")
                .param("agentStatus", "Active"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.content[0].agentCode").value("00000116700"))
                .andExpect(header().string("API-Version", "v1"));
    }

    @Test
    @WithMockUser(authorities = "SCOPE_read-agent")
    void testGetAgents_WithSearchTerm() throws Exception {
        // Given
        when(agentService.searchAgents(any(), any(), any(), any(), eq("00000116700"), anyInt(), anyInt()))
                .thenReturn(testPage);

        // When & Then
        mockMvc.perform(get("/api/agents")
                .header("API-Version", "v1")
                .param("page", "0")
                .param("size", "20")
                .param("search", "00000116700"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.content[0].agentCode").value("00000116700"))
                .andExpect(header().string("API-Version", "v1"));
    }

    @Test
    @WithMockUser(authorities = "SCOPE_read-agent")
    void testGetAgents_Pagination() throws Exception {
        // Given
        List<AgentDTO> agents = Arrays.asList(testAgentDTO);
        Page<AgentDTO> page = new PageImpl<>(agents, PageRequest.of(1, 10), 25);
        when(agentService.searchAgents(any(), any(), any(), any(), any(), eq(1), eq(10)))
                .thenReturn(page);

        // When & Then
        mockMvc.perform(get("/api/agents")
                .header("API-Version", "v1")
                .param("page", "1")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.page").value(1))
                .andExpect(jsonPath("$.size").value(10))
                .andExpect(jsonPath("$.totalElements").value(25))
                .andExpect(header().string("API-Version", "v1"));
    }
}
