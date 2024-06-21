import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button2 } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated, isAdmin } = useAuth();

  const [errorMsg, setErrorMsg] = useState(null);

  const onSubmit = async (data) => {
    try {
      await signin(data);
    } catch (error) {
      setErrorMsg("Inicio de sesión fallido. Por favor, intente de nuevo.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/homepage");
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <motion.section
      className="bg-univalleColorOne h-screen w-screen flex justify-center items-center"
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
          <h1 className="text-white text-3xl font-bold mb-4">Inicie Sesión</h1>
          {errorMsg && <Message type="error">{errorMsg}</Message>}
          {loginErrors && loginErrors.map((error, index) => (
            <Message key={index} type="error">{error}</Message>
          ))}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-white" htmlFor="email">
                Email
              </label>
              <Input
                label="Escriba su email"
                type="email"
                name="email"
                placeholder="suemail@dominio.com"
                {...register("email", { required: true })}
              />
              <p>{errors.email?.message}</p>
            </div>
            <div>
              <label className="text-white" htmlFor="password">
                Contraseña
              </label>
              <Input
                type="password"
                name="password"
                placeholder="Escriba su contraseña"
                {...register("password", { required: true, minLength: 6 })}
              />
              <p>{errors.password?.message}</p>
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
  );
};

export default LoginPage;
