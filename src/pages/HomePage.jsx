import { Link } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

function HomePage() {
  return (
    <motion.section
      className="bg-univalleColorOne flex justify-center items-center w-screen h-screen"
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
        <header className="bg-univalleColorOne p-10 text-white text-center flex flex-col items-center">
          <h1 className="text-5xl py-2 font-bold">MAGEO</h1>
          <p className="text-lg text-white">
            Plataforma digital dedicada a la gestión y coordinación de eventos
            dentro de la universidad.
          </p>

          <Link
            className="bg-gray-800 text-white px-6 py-3 rounded-md mt-4 inline-block hover:bg-gray-600 transition-colors duration-300"
            to="/loginPage"
          >
            Comenzar
          </Link>
        </header>
      </motion.div>
    </motion.section>
  );
}

export default HomePage;
