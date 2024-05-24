import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <motion.section
      className="bg-red-900 flex justify-center items-center w-screen h-screen"
      style={{
        backgroundImage: "url('/assets/campus.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        style={{ opacity: 0.8 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <header className="bg-red-900 p-10 text-white text-center flex flex-col items-center">
          <h1 className="text-5xl py-2 font-bold">SIEGEMUV</h1>
          <p className="text-md text-white-600">
            Plataforma digital dedicada a la gestión y coordinación de eventos
            dentro de la universidad.
          </p>

          <Link
            className="bg-gray-800 text-white px-6 py-3 rounded-md mt-4 inline-block hover:bg-gray-600"
            to="/loginPage"
          >
            Get Started
          </Link>
        </header>
      </motion.div>
    </motion.section>
  );
}

export default HomePage;
