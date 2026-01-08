package com.cathay.flightapi.controller;

import com.cathay.flightapi.dto.FlightDTO;
import com.cathay.flightapi.service.FlightService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FlightController.class)
class FlightControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private FlightService flightService;
    
    private FlightDTO testFlightDTO;
    
    @BeforeEach
    void setUp() {
        testFlightDTO = new FlightDTO();
        testFlightDTO.setId(1L);
        testFlightDTO.setFlightNumber("CX123");
        testFlightDTO.setOrigin("TPE");
        testFlightDTO.setDestination("HKG");
        testFlightDTO.setDepartureTime(LocalDateTime.now().plusDays(1));
        testFlightDTO.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(2));
        testFlightDTO.setAvailableSeats(150);
        testFlightDTO.setPrice(500.0);
    }
    
    @Test
    void testGetAllFlights() throws Exception {
        // Given
        List<FlightDTO> flights = Arrays.asList(testFlightDTO);
        when(flightService.getAllFlights()).thenReturn(flights);
        
        // When & Then
        mockMvc.perform(get("/api/flights")
                        .header("API-Version", "v1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].flightNumber").value("CX123"))
                .andExpect(header().string("API-Version", "v1"));
    }
    
    @Test
    void testGetFlightById() throws Exception {
        // Given
        when(flightService.getFlightById(1L)).thenReturn(testFlightDTO);
        
        // When & Then
        mockMvc.perform(get("/api/flights/1")
                        .header("API-Version", "v1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.flightNumber").value("CX123"))
                .andExpect(header().string("API-Version", "v1"));
    }
    
    @Test
    void testSearchFlights() throws Exception {
        // Given
        List<FlightDTO> flights = Arrays.asList(testFlightDTO);
        when(flightService.getFlightsByRoute("TPE", "HKG")).thenReturn(flights);
        
        // When & Then
        mockMvc.perform(get("/api/flights/search")
                        .param("origin", "TPE")
                        .param("destination", "HKG")
                        .header("API-Version", "v1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].origin").value("TPE"))
                .andExpect(jsonPath("$[0].destination").value("HKG"))
                .andExpect(header().string("API-Version", "v1"));
    }
    
    @Test
    void testCreateFlight() throws Exception {
        // Given
        when(flightService.createFlight(any(FlightDTO.class))).thenReturn(testFlightDTO);
        
        // When & Then
        mockMvc.perform(post("/api/flights")
                        .header("API-Version", "v1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"flightNumber\":\"CX123\",\"origin\":\"TPE\",\"destination\":\"HKG\",\"departureTime\":\"2024-12-25T10:00:00\",\"arrivalTime\":\"2024-12-25T12:00:00\",\"availableSeats\":150,\"price\":500.0}"))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.flightNumber").value("CX123"))
                .andExpect(header().string("API-Version", "v1"));
    }
}

