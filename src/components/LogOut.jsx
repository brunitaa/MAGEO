import React from "react";
import { ButtonLink } from "./ui/ButtonLink";
import { Button } from "./ui/Button";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {  signOut } from "firebase/auth";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    signOut(auth).then(() => {
      // Sign-out successful.
          navigate("/");
          console.log("Signed out successfully")
      }).catch((error) => {
        console.log("Error al cerrar sesión:", error.message);
      });
  };

  return (
    <Button
      onClick={handleLogout}
      className="nav-link text-white px-4 py-2 rounded"
    >
      Log Out 
    </Button>
  );
}

export default LogoutButton;

