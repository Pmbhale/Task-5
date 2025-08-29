import React from 'react';
import './Footer.scss';


export default function Footer(){
return (
<footer className="footer">
<div className="container footer-inner">
<div>
<div className="brand">✈️ <span className="brand-name">SkyFleet</span></div>
<p className="muted">Modern flight booking UI</p>
</div>
<div className="footer-links">
<a href="#search">Search</a>
<a href="#deals">Deals</a>
<a href="#support">Support</a>
</div>
</div>
</footer>
);
}