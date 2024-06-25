import React from "react";

function Footer() {
  return (
    <footer className="mt-8 p-4 bg-univalleColorTwo text-white text-center w-full">
      <h2 className="text-2xl py-2 font-bold">Más Información</h2>
      <div className="flex justify-center space-x-4">
        <a
          href="https://github.com/brunitaa/MAGEO"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:underline flex items-center"
        >
          <i className="fab fa-github mr-2"></i>
          Repositorio Frontend
        </a>
        <a
          href="https://github.com/iamcarlosdaniel/MAGEO"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:underline flex items-center"
        >
          <i className="fab fa-github mr-2"></i>
          Repositorio Backend
        </a>
        <a
          href="https://youtu.be/mURb_t4A9dA?si=XtmGUYt9Ie44iYsH"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:underline flex items-center"
        >
          <i className="fab fa-youtube mr-2"></i>
          YouTube
        </a>
      </div>
      <div className="mt-4">
        <p className="flex justify-center items-center">
          <i className="fas fa-phone-alt mr-2"></i>
          +591 (6) 928 3648
        </p>
        <p className="flex justify-center items-center mt-2">
          <i className="fas fa-envelope mr-2"></i>
          mac6000472@est.univalle.edu
        </p>
      </div>
    </footer>
  );
}

export default Footer;
