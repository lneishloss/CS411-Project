import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./Components/Navbar"
import { Routes, Route } from 'react-router-dom'
import { AboutUs } from './Components/Pages/aboutUs'
import { HealthChatbot } from './Components/Pages/healthChatbot'
import { LocalPharmacies } from './Components/Pages/localPharmacies'
import { LandingPage } from './Components/Pages/LandingPage'



function App() {
  const [count, setCount] = useState(0)

  return (
    <><div className="NavBar">
      <Navbar />
      <Routes>
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/HealthChatbot" element={<HealthChatbot />} />
        <Route path="/LocalPharmacies" element={<LocalPharmacies />} />
      </Routes>
    </div>
    </>
  )
}

export default App
