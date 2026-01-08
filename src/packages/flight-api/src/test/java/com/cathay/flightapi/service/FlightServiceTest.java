package com.cathay.flightapi.service;

import com.cathay.flightapi.dto.FlightDTO;
import com.cathay.flightapi.entity.Flight;
import com.cathay.flightapi.repository.FlightRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FlightServiceTest {
    
    @Mock
    private FlightRepository flightRepository;
    
    @InjectMocks
    private FlightService flightService;
    
    private Flight testFlight;
    private FlightDTO testFlightDTO;
    
    @BeforeEach
    void setUp() {
        testFlight = new Flight();
        testFlight.setId(1L);
        testFlight.setFlightNumber("CX123");
        testFlight.setOrigin("TPE");
        testFlight.setDestination("HKG");
        testFlight.setDepartureTime(LocalDateTime.now().plusDays(1));
        testFlight.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(2));
        testFlight.setAvailableSeats(150);
        testFlight.setPrice(500.0);
        
        testFlightDTO = new FlightDTO(testFlight);
    }
    
    @Test
    void testGetAllFlights() {
        // Given
        List<Flight> flights = Arrays.asList(testFlight);
        when(flightRepository.findAll()).thenReturn(flights);
        
        // When
        List<FlightDTO> result = flightService.getAllFlights();
        
        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("CX123", result.get(0).getFlightNumber());
        verify(flightRepository, times(1)).findAll();
    }
    
    @Test
    void testGetFlightById_Success() {
        // Given
        when(flightRepository.findById(1L)).thenReturn(Optional.of(testFlight));
        
        // When
        FlightDTO result = flightService.getFlightById(1L);
        
        // Then
        assertNotNull(result);
        assertEquals("CX123", result.getFlightNumber());
        assertEquals("TPE", result.getOrigin());
        assertEquals("HKG", result.getDestination());
        verify(flightRepository, times(1)).findById(1L);
    }
    
    @Test
    void testGetFlightById_NotFound() {
        // Given
        when(flightRepository.findById(999L)).thenReturn(Optional.empty());
        
        // When & Then
        assertThrows(RuntimeException.class, () -> flightService.getFlightById(999L));
        verify(flightRepository, times(1)).findById(999L);
    }
    
    @Test
    void testGetFlightsByRoute() {
        // Given
        List<Flight> flights = Arrays.asList(testFlight);
        when(flightRepository.findByOriginAndDestination("TPE", "HKG")).thenReturn(flights);
        
        // When
        List<FlightDTO> result = flightService.getFlightsByRoute("TPE", "HKG");
        
        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("TPE", result.get(0).getOrigin());
        assertEquals("HKG", result.get(0).getDestination());
        verify(flightRepository, times(1)).findByOriginAndDestination("TPE", "HKG");
    }
    
    @Test
    void testCreateFlight() {
        // Given
        when(flightRepository.save(any(Flight.class))).thenReturn(testFlight);
        
        // When
        FlightDTO result = flightService.createFlight(testFlightDTO);
        
        // Then
        assertNotNull(result);
        assertEquals("CX123", result.getFlightNumber());
        verify(flightRepository, times(1)).save(any(Flight.class));
    }
}

