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

        <footer className="mt-8 p-4 bg-univalleColorTwo text-white text-center">
          <h2 className="text-2xl py-2 font-bold">Más Información</h2>
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/brunitaa/MAGEO"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-3 rounded-md inline-block hover:bg-gray-600 transition-colors duration-300"
            >
              Repositorio Frontend
            </a>
            <a
              href="https://github.com/iamcarlosdaniel/MAGEO"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-3 rounded-md inline-block hover:bg-gray-600 transition-colors duration-300"
            >
              Repositorio Backend
            </a>
            <a
              href="https://youtu.be/mURb_t4A9dA?si=XtmGUYt9Ie44iYsH"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-3 rounded-md inline-block hover:bg-gray-600 transition-colors duration-300"
            >
              YouTube
            </a>
          </div>
        </footer>
      </motion.div>
    </motion.section>
  );
}

export default HomePage;
