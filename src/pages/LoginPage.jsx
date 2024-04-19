import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { Card, Button, Input, Label, ButtonLink } from "../components/ui";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 
import { Button2 } from "../components/ui/Button";
import { useUser } from "../UserProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const user = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  function sendLoginRequest(event) {
    event.preventDefault(); // Prevent default form submission
    
    setErrorMsg("");
    const reqBody = {
      "email": email,
      "password": password
    };
    console.log("Request body:", reqBody); // Add this line for debugging
    
    fetch("http://localhost:3000/api/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Failed to login');
        }
      })
      .then((data) => {
        user.setJwt(data);
        console.log(data);
        console.log("Redirecting to homepage...");
        navigate("/homepage");
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrorMsg(error.message);
      });
  }
  
  return (
    <section className="bg-red-900 min-h-screen flex justify-center Ítems-center">
      <div className="w-80 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-red-900 dark:border-red-900">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 h-full">
          <h1 className="text-white text-3xl font-bold mb-4">Sign in to your account</h1>
          <form className="space-y-4" onSubmit={sendLoginRequest}>
            <div>
              <label className="text-white" htmlFor="email">Your email</label>
              <Input
                type="email"
                name="email"
                placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-white" htmlFor="password">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button2
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </Button2>
        
          </form>
        </div>
      </div>
    </section>
  );
}
export default LoginPage