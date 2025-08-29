import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import './MyBookings.scss';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("http://localhost:8080/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const cancelBooking = async (id,flightNumber) => {
    try {
      await api.delete(`http://localhost:8080/bookings/${id}`);
      alert(`Flight Cancelled }`);
      fetchBookings(); // cancel ke baad refresh karlo
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };

  return (
    <div>
      <h2>My Bookings</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Flight No</th>
            <th>Airline</th>
            <th>From</th>
            <th>To</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr key={index}>
              <td>{b.name}</td>
              <td>{b.email}</td>
              <td>{b.phone}</td>
              <td>{b.flight?.flightNumber}</td>
              <td>{b.flight?.airline}</td>
              <td>{b.flight?.source}</td>
              <td>{b.flight?.destination}</td>
              <td>{b.flight?.departureTime}</td>
              <td>{b.flight?.arrivalTime}</td>
              <td>{b.flight?.price}</td>
              <td>
                <button onClick={() => cancelBooking(b.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

