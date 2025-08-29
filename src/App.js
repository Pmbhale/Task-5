import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightSearch from './Components/FlightSearch/FlightSearch';
import BookingForm from './Components/BookingForm/BookingForm';
import MyBookings from './Components/MyBookings/MyBookings';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';

export default function App() {
    return ( <
        Router >
        <
        div className = "app-root" >
        <
        Navbar / >
        <
        Hero / >

        <
        Routes >
        <
        Route path = "/"
        element = { < FlightSearch / > }
        /> <
        Route path = "/booking"
        element = { < BookingForm / > }
        /> <
        Route path = "/mybookings"
        element = { < MyBookings / > }
        /> <
        Route path = "/contact"
        element = { < Contact / > }
        /> < /
        Routes >

        <
        Footer / >
        <
        /div> < /
        Router >
    );
}