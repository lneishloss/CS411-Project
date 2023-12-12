import React from 'react';
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"


export const Navbar = () => {
  return <nav>
    <Link to="/LandingPage" id="homepage" className="Home">CareMate</Link>
    <ul>
      <li><NavLink to="/Profile">Profile</NavLink></li>
      <li><NavLink to="/Workouts">Workouts</NavLink></li>
      <li><NavLink to="/Recipes">Recipes</NavLink></li>
      <li><NavLink to="/Login">Login</NavLink></li>
    </ul>
  </nav>;
}

export default Navbar;
