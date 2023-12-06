import { useState } from 'react'
import './App.css'
import Navbar from "./Components/Navbar"
import { Routes, Route } from 'react-router-dom'
import { AboutUs } from './Components/Pages/aboutUs'
import { HealthChatbot } from './Components/Pages/healthChatbot'
import { LocalPharmacies } from './Components/Pages/localPharmacies'
import { LandingPage } from './Components/Pages/LandingPage'
import { Profile } from './Components/Pages/Profile'
import { Login } from './Components/Pages/Login'
import { useEffect } from 'react'
import axios from "axios";
import { jwtDecode } from 'jwt-decode';


function App() {

  function handleResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:'1039607616867-frb9oh2eqt425ld30k3qh3fo7rtsepk4.apps.googleusercontent.com',
      callback: handleResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline",
      size: "large"
      }

    );

  }, []);
  /* global google */
  /* -- telling app Google exists */


  return (

    <>

    <div className= "Apple">
      <div id = "signInDiv" ></div>
    </div>
    
    <div className="NavBar">
      <Navbar />
      <Routes>
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/HealthChatbot" element={<HealthChatbot />} />
        <Route path="/LocalPharmacies" element={<LocalPharmacies />} />
        <Route path="/Login" element={<Login />} />
        
      </Routes>
    </div>
    </>
  )
}

export default App
