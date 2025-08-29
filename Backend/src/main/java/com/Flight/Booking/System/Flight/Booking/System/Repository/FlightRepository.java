package com.Flight.Booking.System.Flight.Booking.System.Repository;



import com.Flight.Booking.System.Flight.Booking.System.Model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
}
