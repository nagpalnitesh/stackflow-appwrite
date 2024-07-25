"use client";
import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";

const LoginPage = () => {
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //collect data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // validate
    if (!email || !password) {
      setError(() => "Please fill out the details");
      return;
    }

    // handle loading and error
    setIsLoading(true);
    setError("");

    // call the login store
    const loginResponse = await login(email.toString(), password.toString());

    if (loginResponse.error) {
      setError(() => loginResponse.error!.message);
    }

    setIsLoading(() => false);
  };

  return (
    <>
      <div>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}></form>
      </div>
    </>
  );
};

export default LoginPage;
