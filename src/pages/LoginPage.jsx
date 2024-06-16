import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button2 } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated, isAdmin } = useAuth();
  const onSubmit = (data) => signin(data);

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
          <h1 className="text-white text-3xl font-bold mb-4">
            Sign in to your account
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-white" htmlFor="email">
                Your email
              </label>
              <Input
                label="Write your email"
                type="email"
                name="email"
                placeholder="youremail@domain.tld"
                {...register("email", { required: true })}
              />
              <p>{errors.email?.message}</p>
            </div>
            <div>
              <label className="text-white" htmlFor="password">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="Write your password"
                {...register("password", { required: true, minLength: 6 })}
              />
              <p>{errors.password?.message}</p>
            </div>
            <Button2
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </Button2>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
};
export default LoginPage;
