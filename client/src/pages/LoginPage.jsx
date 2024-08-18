import React, { useState } from "react";
import PasswordBox from "../components/PasswordBox";
import InputBox from "../components/InputBox";
import PrimaryButton from "../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/useAuthContext";

const LoginPage = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!data.error) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  if (isAuthenticated) {
    navigate("/home");
  }

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h1 className="text-center font-bold text-2xl mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          <InputBox
            name="email"
            placeholder="nischal@gmail.com"
            label="Email:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordBox
            name="password"
            placeholder="nischal@123"
            label="Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-sm mt-3 text-red-600">{error}</div>}
          <div className="mt-3">
            <PrimaryButton value="Login" />
          </div>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link className="text-blue-500 underline" to="/">
            Sign up now...
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
