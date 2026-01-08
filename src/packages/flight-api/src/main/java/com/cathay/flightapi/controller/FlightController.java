package com.cathay.flightapi.controller;

import com.cathay.flightapi.dto.FlightDTO;
import com.cathay.flightapi.service.FlightService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {
    
    private final FlightService flightService;
    
    @Autowired
    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }
    
    @GetMapping
    public ResponseEntity<List<FlightDTO>> getAllFlights(HttpServletRequest request) {
        String apiVersion = (String) request.getAttribute("apiVersion");
        List<FlightDTO> flights = flightService.getAllFlights();
        return ResponseEntity.ok()
                .header("API-Version", apiVersion != null ? apiVersion : "v1")
                .body(flights);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<FlightDTO> getFlightById(@PathVariable Long id, HttpServletRequest request) {
        String apiVersion = (String) request.getAttribute("apiVersion");
        FlightDTO flight = flightService.getFlightById(id);
        return ResponseEntity.ok()
                .header("API-Version", apiVersion != null ? apiVersion : "v1")
                .body(flight);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<FlightDTO>> searchFlights(
            @RequestParam(required = false) String origin,
            @RequestParam(required = false) String destination,
            HttpServletRequest request) {
        String apiVersion = (String) request.getAttribute("apiVersion");
        List<FlightDTO> flights;
        
        if (origin != null && destination != null) {
            flights = flightService.getFlightsByRoute(origin, destination);
        } else {
            flights = flightService.getAllFlights();
        }
        
        return ResponseEntity.ok()
                .header("API-Version", apiVersion != null ? apiVersion : "v1")
                .body(flights);
    }
    
    @PostMapping
    public ResponseEntity<FlightDTO> createFlight(@RequestBody FlightDTO flightDTO, HttpServletRequest request) {
        String apiVersion = (String) request.getAttribute("apiVersion");
        FlightDTO createdFlight = flightService.createFlight(flightDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("API-Version", apiVersion != null ? apiVersion : "v1")
                .body(createdFlight);
    }
}

