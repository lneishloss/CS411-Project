import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import { useGoogleOneTapLogin } from 'react-google-login'
import axios from 'axios'


//import { useGoogleOAuth } from '@react-oauth/google'


export const Login = () => {
  return (
    <div id='SignIn'>
        <GoogleLogin
          clientId='1039607616867-frb9oh2eqt425ld30k3qh3fo7rtsepk4.apps.googleusercontent.com' >
          
        </GoogleLogin>
    </div>

 
  )
}