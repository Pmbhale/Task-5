import React, { useState, useEffect } from "react";
import api from "../api/apiClient";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./FlightSearch.scss"; // ✅ New CSS file

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passenger, setPassenger] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: ""
  });
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/flights").then((res) => setFlights(res.data)).catch(console.error);
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    api.get("http://localhost:8080/bookings")
      .then((res) => setBookings(res.data))
      .catch(console.error);
  };

  const handleSearch = () => {
    const results = flights.filter((f) => {
      const matchesSource = f.source.toLowerCase().includes(source.toLowerCase());
      const matchesDestination = f.destination.toLowerCase().includes(destination.toLowerCase());
      const flightDate = new Date(f.departureTime).toISOString().split("T")[0];
      const matchesDate = departureDate ? flightDate === departureDate : true;
      return matchesSource && matchesDestination && matchesDate;
    });
    setSearchResults(results);
  };

  const handleBookClick = (flight) => {
    setSelectedFlight(flight);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const pnr = "PNR" + Math.floor(100000 + Math.random() * 900000);
      await api.post("http://localhost:8080/bookings", {
        ...passenger,
        flightId: selectedFlight.id,
        pnr
      });

      alert("Booking successful! Ticket generating...");

      const doc = new jsPDF();
      const img = new Image();
      img.src = logo;

      doc.addImage(img, "PNG", 10, 7, 40, 20);
      doc.setFontSize(22);
      doc.text(" GoFly - Flight Ticket", 80, 20);
      doc.setLineWidth(0.5);
      doc.line(20, 25, 190, 25);

      doc.setFontSize(14);
      doc.text("Passenger Details:", 20, 40);
      doc.setFontSize(12);
      doc.text(`Name: ${passenger.name}`, 20, 50);
      doc.text(`Age: ${passenger.age}`, 20, 60);
      doc.text(`Gender: ${passenger.gender}`, 20, 70);
      doc.text(`Email: ${passenger.email}`, 20, 80);
      doc.text(`Phone: ${passenger.phone}`, 20, 90);

      doc.setFontSize(14);
      doc.text("Flight Details:", 20, 110);
      doc.setFontSize(12);
      doc.text(`Airline: ${selectedFlight.airline}`, 20, 120);
      doc.text(`Flight Number: ${selectedFlight.flightNumber}`, 20, 130);
      doc.text(`From: ${selectedFlight.source}`, 20, 140);
      doc.text(`To: ${selectedFlight.destination}`, 20, 150);
      doc.text(`Departure: ${new Date(selectedFlight.departureTime).toLocaleString()}`, 20, 160);
      doc.text(`Arrival: ${new Date(selectedFlight.arrivalTime).toLocaleString()}`, 20, 170);
      doc.text(`Price: ₹${selectedFlight.price}`, 20, 180);

      doc.setFontSize(14);
      doc.text(`PNR: ${pnr}`, 20, 200);
      doc.text("✅ Status: BOOKED", 20, 220);

      const pdfBlob = doc.output("bloburl");
      window.open(pdfBlob, "_blank");

      doc.save(`ticket-${selectedFlight.flightNumber}.pdf`);

      setSelectedFlight(null);
      setPassenger({ name: "", age: "", gender: "", email: "", phone: "" });
      fetchBookings();
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed!");
    }
  };

  const cancelBooking = async (id) => {
    try {
      await api.delete(`http://localhost:8080/bookings/${id}`);
      alert("Booking cancelled!");
      setBookings(bookings.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Cancel failed!");
    }
  };

  return (
    <div className="flight-container">
      <h2 className="title">✈️ Search Flights</h2>
      <div className="search-box">
        <input type="text" placeholder="From" value={source} onChange={(e) => setSource(e.target.value)} />
        <input type="text" placeholder="To" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
        <button className="btn" onClick={handleSearch}>Search</button>
      </div>

      <div className="results">
        {searchResults.map((f) => (
          <div key={f.id} className="flight-card">
            <h3>{f.flightNumber} - {f.airline}</h3>
            <p>{f.source} → {f.destination}</p>
            <p><strong>Departure:</strong> {new Date(f.departureTime).toLocaleString()}</p>
            <p><strong>Arrival:</strong> {new Date(f.arrivalTime).toLocaleString()}</p>
            <p><strong>Price:</strong> ₹{f.price}</p>
            <button className="btn-book" onClick={() => handleBookClick(f)}>Book Now</button>
          </div>
        ))}
      </div>

      {selectedFlight && (
        <div className="form-container">
          <h3>Passenger Details</h3>
          <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Name" value={passenger.name} required onChange={(e) => setPassenger({ ...passenger, name: e.target.value })} />
            <input type="number" placeholder="Age" value={passenger.age} required onChange={(e) => setPassenger({ ...passenger, age: e.target.value })} />
            <select value={passenger.gender} required onChange={(e) => setPassenger({ ...passenger, gender: e.target.value })}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input type="email" placeholder="Email" value={passenger.email} required onChange={(e) => setPassenger({ ...passenger, email: e.target.value })} />
            <input type="text" placeholder="Phone" value={passenger.phone} required onChange={(e) => setPassenger({ ...passenger, phone: e.target.value })} />
            <button className="btn-confirm" type="submit">Confirm Booking</button>
          </form>
        </div>
      )}

      <h2 className="title">📖 Booking History</h2>
      {bookings.length > 0 ? (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Passenger</th>
              <th>Email</th>
              <th>Flight</th>
              <th>From</th>
              <th>To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.flight?.flightNumber}</td>
                <td>{b.flight?.source}</td>
                <td>{b.flight?.destination}</td>
                <td>
                  <button className="btn-cancel" onClick={() => cancelBooking(b.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p>No bookings yet.</p>}
    </div>
  );
};

export default FlightSearch;
