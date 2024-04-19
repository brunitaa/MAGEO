import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

function HomePage() {

  
  return (
    <section className="bg-red-900 min-h-screen flex justify-center items-center" style={{backgroundImage: "url('/images/campus.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}>
      <div style={{opacity: 0.8}}>
      <header className="bg-red-900 p-10 text-white text-center">
        <h1 className="text-5xl py-2 font-bold">SIEGEMUV</h1>
        <p className="text-md text-white-600">
          Plataforma digital dedicada a la gestión y coordinación de eventos dentro de la universidad.
        </p>

        <Link
          className="bg-gray-800 text-white px-6 py-3 rounded-md mt-4 inline-block hover:bg-gray-600"
          to="/loginPage"
        >
          Get Started
        </Link>
      </header>
      </div>
    </section>
  );
}

export default HomePage;
