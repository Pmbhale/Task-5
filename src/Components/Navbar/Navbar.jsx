import React, { useState } from 'react';
import './NavBar.scss';
import { Link } from "react-router-dom";

export default function Navbar() {
const [open, setOpen] = useState(false);
return (
<header className="navbar">
<div className="container nav-inner">
<div className="brand">
<div className="logo" aria-hidden>✈️</div>
<span className="brand-name">GoFLY</span>
</div>
<nav className={`nav-links ${open ? 'open' : ''}`}>

            <Link to="/">Book</Link>

<a href="#deals">Deals</a>
<a href="#support">Support</a>
<button className="btn ghost">Sign in</button>
<button className="btn solid">Sign up</button>
</nav>
<button className="hamburger" onClick={() => setOpen(!open)} aria-label="menu">
<span />
<span />
<span />
</button>
</div>
</header>
);
}