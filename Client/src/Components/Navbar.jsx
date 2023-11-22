import React from 'react';
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"


export const Navbar = () => {
  return <nav>
    <Link to="/LandingPage" id="homepage" className="Home">CareMate</Link>
    <ul>
      <li><NavLink to="/Profile">Profile</NavLink></li>
      <li><NavLink to="/LocalPharmacies">Local Pharmacies</NavLink></li>
      <li><NavLink to="/HealthChatbot">Health Chatbot</NavLink></li>
      <li><NavLink to="/AboutUs">About Us</NavLink></li>
    </ul>
  </nav>;
}

export default Navbar;
