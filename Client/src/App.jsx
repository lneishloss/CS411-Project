import { useState } from 'react'
import './App.css'
import Navbar from "./Components/Navbar"
import { Routes, Route } from 'react-router-dom'
import {Login } from './Components/Pages/Login'
import { AboutUs } from './Components/Pages/aboutUs'
import { HealthChatbot } from './Components/Pages/healthChatbot'
import { LocalPharmacies } from './Components/Pages/localPharmacies'
import { LandingPage } from './Components/Pages/LandingPage'
import { Profile } from './Components/Pages/Profile'
import { useEffect } from 'react'
import axios from "axios";



function App() {
  const [count, setCount] = useState(0)

  return (
    <><div className="NavBar">
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
