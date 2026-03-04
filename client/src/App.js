import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login.js'
import Home from './pages/Home.js'
import Signup from './pages/Signup.js'
import { LoadScript } from '@react-google-maps/api';

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [location, setLocation] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /*useEffect(() => {
    if (!navigator.geolocation) {
      alert("geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (err) => {
        alert(err.message);
      }
    );
  }, []);*/
  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={['places']}
    >
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} location={location} setLocation={setLocation}/>} />
      </Routes>
    </LoadScript>
  );
}

export default App;
