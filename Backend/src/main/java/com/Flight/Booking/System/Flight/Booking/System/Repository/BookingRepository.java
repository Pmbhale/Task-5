package com.Flight.Booking.System.Flight.Booking.System.Repository;
import com.Flight.Booking.System.Flight.Booking.System.Model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {}

