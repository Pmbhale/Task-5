package com.Flight.Booking.System.Flight.Booking.System.Servioce;

import com.Flight.Booking.System.Flight.Booking.System.Model.Flight;
import com.Flight.Booking.System.Flight.Booking.System.Repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }
}
