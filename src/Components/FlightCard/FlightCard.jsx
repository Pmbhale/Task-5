import React, { useState } from 'react';
import QuickBookModal from '../QuickBook/QuickBookModal';
import './FlightCard.scss';


export default function FlightCard({ flight }) {
const [open, setOpen] = useState(false);
return (
<article className="card flight-card">
<div className="airline">
<div className="logo-circle" />
<div>
<h4>{flight.flightNumber}</h4>
<p className="muted">{flight.airline}</p>
</div>
</div>


<div className="times">
<div>
<h3>{flight.departureTime}</h3>
<p className="muted">{flight.source}</p>
</div>
<div className="timeline">
<span className="dot" />
<span className="line" />
</div>
<div>
<h3>{flight.arrivalTime}</h3>
<p className="muted">{flight.destination}</p>
</div>
</div>


<div className="price">
<div>
<h3>₹ {flight.fare}</h3>
<p className="muted">{flight.seatsAvailable} seats</p>
</div>
<button className="btn solid" onClick={() => setOpen(true)}>Book</button>
</div>


{open && <QuickBookModal flight={flight} onClose={() => setOpen(false)} />}
</article>
);
}