import React from 'react';
import FlightCard from '../FlightCard/FlightCard';


export default function SearchResults({ results }) {
if (!results.length) return <div className="results-empty">No results yet. Try a search.</div>;
return (
<div className="results-grid">
{results.map((f) => <FlightCard key={f.id} flight={f} />)}
</div>
);
}

