import React from 'react'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import { useGoogleOneTapLogin } from 'react-google-login'
import axios from 'axios'
import '../../App.jsx'
import { useUserContext } from '../../UserContext';



//import { useGoogleOAuth } from '@react-oauth/google'


export const Login = () => {
  const { updateUserObject } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  var userName = "";
  var userEmail = "";

  useEffect(() => {
    function handleResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
      var userObject = jwtDecode(response.credential);
      console.log(userObject);
      userName = userObject.name;
      userEmail = userObject.email;

      updateUserObject(userEmail);

      //Post a Username/Email
      fetch('http://localhost:3000/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('User data added to the database:', data);
          setIsLoggedIn(true);
          // Optionally, you can redirect or perform other actions after successful login
        })
        .catch(error => {
          console.error('Error adding user data to the database:', error);
        });

      //window.location.href = '/profile'; //Go to the profile Page once you log in
    }

    // Initialize Google OAuth
    google.accounts.id.initialize({
      client_id: '1039607616867-frb9oh2eqt425ld30k3qh3fo7rtsepk4.apps.googleusercontent.com',
      callback: handleResponse,
    });

    // Render Google OAuth button
    if (!isLoggedIn) {
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme: "outline",
          size: "large",
        }
      );
    }

    // Clean up function (optional)
    return () => {
      // You can perform cleanup tasks if needed
    };
  }, [isLoggedIn]); // Empty dependency array means this effect runs once on mount

  // if (isLoggedIn) {
  //   return (
  //     <div>
  //       <p>You are already logged in. Redirecting...</p>
  //       {/* Optionally, redirect immediately */}
  //       {setTimeout(() => {
  //         window.location.href = '/profile';
  //       }, 2000)}
  //     </div>
  //   );
  // }

  return (
    <div className="Login">
      <br />
      <br />
      <div className="Apple">
        {isLoggedIn ? (
          <p>You are logged in!</p>
        ) : (
          <div id="signInDiv"></div>
        )}
      </div>
    </div>
  );
};