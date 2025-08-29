package com.Flight.Booking.System.Flight.Booking.System.Cotroller;


import com.Flight.Booking.System.Flight.Booking.System.Model.Flight;
import com.Flight.Booking.System.Flight.Booking.System.Servioce.FlightService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/flights")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    // ✅ API: List all flights
    @GetMapping
    public List<Flight> getFlights() {
        return flightService.getAllFlights();
    }
}
