package com.cathay.flightapi.service;

import com.cathay.flightapi.dto.FlightDTO;
import com.cathay.flightapi.entity.Flight;
import com.cathay.flightapi.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FlightService {
    
    private final FlightRepository flightRepository;
    
    @Autowired
    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }
    
    public List<FlightDTO> getAllFlights() {
        return flightRepository.findAll().stream()
                .map(FlightDTO::new)
                .collect(Collectors.toList());
    }
    
    public FlightDTO getFlightById(Long id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found with id: " + id));
        return new FlightDTO(flight);
    }
    
    public List<FlightDTO> getFlightsByRoute(String origin, String destination) {
        return flightRepository.findByOriginAndDestination(origin, destination).stream()
                .map(FlightDTO::new)
                .collect(Collectors.toList());
    }
    
    public FlightDTO createFlight(FlightDTO flightDTO) {
        Flight flight = new Flight(
                flightDTO.getFlightNumber(),
                flightDTO.getOrigin(),
                flightDTO.getDestination(),
                flightDTO.getDepartureTime(),
                flightDTO.getArrivalTime(),
                flightDTO.getAvailableSeats(),
                flightDTO.getPrice()
        );
        Flight savedFlight = flightRepository.save(flight);
        return new FlightDTO(savedFlight);
    }
}

