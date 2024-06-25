import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button2 } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signin, errors: loginErrors, isAuthenticated, isAdmin } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null); // Estado para almacenar el mensaje de error

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signin(data);
      // Limpiar los errores y resetear el formulario si el inicio de sesión es exitoso
      setErrorMessage(null);
      reset();
    } catch (error) {
      console.error("Login error:", error);
      let message =
        "Error al intentar iniciar sesión. Por favor, inténtelo de nuevo.";
      if (error.response && error.response.data && error.response.data.error) {
        const { error: backendError } = error.response.data;
        if (backendError === "Incorrect password") {
          message = "Contraseña incorrecta. Por favor, inténtelo de nuevo.";
        } else if (backendError === "User not found") {
          message =
            "El email proporcionado no está registrado. Por favor, verifique e inténtelo de nuevo.";
        } else {
          message = backendError; // Otro tipo de errores que puedan venir del backend
        }
      }
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("isAdmin:", isAdmin);
    if (isAuthenticated) {
      if (isAdmin) {
        console.log("Redirecting to admin page...");
        navigate("/admin");
      } else {
        console.log("Redirecting to homepage...");
        navigate("/homepage");
      }
    }
  }, [isAuthenticated, isAdmin]);

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-univalleColorOne"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.section
        className="flex flex-grow justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-80 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-univalleColorOne dark:border-red-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-4 h-full">
            <h1 className="text-white text-3xl font-bold mb-4">
              Inicie Sesión
            </h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-white" htmlFor="email">
                  Email
                </label>
                <Input
                  label="Escribe tu Email"
                  type="email"
                  name="email"
                  placeholder="email@dominio.tld"
                  {...register("email", { required: true })}
                />
                <p className="text-white-500">{errors.email?.message}</p>
              </div>
              <div>
                <label className="text-white" htmlFor="password">
                  Contraseña
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Escribe tu contraseña"
                  {...register("password", { required: true, minLength: 6 })}
                />
                <p className="text-white-500">{errors.password?.message}</p>
              </div>
              <Button2
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Iniciar Sesión
              </Button2>
            </form>
          </div>
        </motion.div>
      </motion.section>
      <Footer />
    </motion.div>
  );
};

export default LoginPage;
