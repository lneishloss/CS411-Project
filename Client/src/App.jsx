import './App.css'
import Navbar from "./Components/Navbar"
import { Routes, Route } from 'react-router-dom'
import { AboutUs } from './Components/Pages/aboutUs'
import { HealthChatbot } from './Components/Pages/healthChatbot'
import { LocalPharmacies } from './Components/Pages/localPharmacies'
import { LandingPage } from './Components/Pages/LandingPage'
import { Profile } from './Components/Pages/Profile'
import { Login } from './Components/Pages/Login'
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function App() {

  function handleResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
  }

  /*
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
  */

  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );

    // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
      googleLogout();
      setProfile(null);
  };

  /* global google */
  /* -- telling app Google exists */


  return (

    <>

    <div>
        <h2>React Google Login</h2>
        <br />
        <br />
        {profile ? (
          <div>
            <img src={profile.picture} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button onClick={logOut}>Log out</button>
          </div>
        ) : (
          <button onClick={() => login()}>Sign in with Google </button>
        )}
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
