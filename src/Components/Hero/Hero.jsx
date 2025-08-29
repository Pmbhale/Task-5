import React from 'react';
import './Hero.scss';
import heroVideo from './hero.mp4';

export default function Hero() {
return (
<section className="hero">
<video className="hero-video" src={heroVideo} autoPlay loop muted playsInline />
<div className="hero-overlay" />
<div className="container hero-content">
<h1>Find your next flight, fast.</h1>
<p>Search, compare and book tickets with a clean, modern UI.</p>
<a href="#search" className="btn cta">Start searching</a>
</div>
</section>
);
}