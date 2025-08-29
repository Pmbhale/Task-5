package com.Flight.Booking.System.Flight.Booking.System.Cotroller;

import com.Flight.Booking.System.Flight.Booking.System.Model.Booking;
import com.Flight.Booking.System.Flight.Booking.System.Model.Flight;
import com.Flight.Booking.System.Flight.Booking.System.Repository.BookingRepository;
import com.Flight.Booking.System.Flight.Booking.System.Repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/bookings")

public class BookingController {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private FlightRepository flightRepo;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Map<String, Object> req) {
        Long flightId = Long.valueOf(req.get("flightId").toString());
        Flight flight = flightRepo.findById(flightId).orElseThrow();

        Booking booking = new Booking();
        booking.setName(req.get("name").toString());
        booking.setAge(Integer.parseInt(req.get("age").toString()));
        booking.setGender(req.get("gender").toString());
        booking.setEmail(req.get("email").toString());
        booking.setPhone(req.get("phone").toString());
        booking.setFlight(flight);

        bookingRepo.save(booking);

        return ResponseEntity.ok(booking);
    }
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingRepo.findAll();
        return ResponseEntity.ok(bookings);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id) {
        if (bookingRepo.existsById(id)) {
            bookingRepo.deleteById(id);
            return ResponseEntity.ok("Booking cancelled successfully");
        } else {
            return ResponseEntity.status(404).body("Booking not found");
        }
    }


}
