import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordBox from "../components/PasswordBox";
import InputBox from "../components/InputBox";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/useAuthContext";

const SignupPage = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if(isAuthenticated){
    navigate('/home');
  }

  const handleSignup = async (e) => {
    setError(null)
    e.preventDefault();

    // Form validation
    if (!fullName) {
      setError("Enter your full name please!!");
      return;
    }
    if (!email) {
      setError("Enter your email please!!");
      return;
    }
    if (!password) {
      setError("Enter your password please!!");
      return;
    }

    // Signup request
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

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

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h1 className="text-center font-bold text-2xl mb-6">Signup</h1>
        <form onSubmit={handleSignup}>
          <InputBox
            name="fullName"
            placeholder="John Doe"
            label="Full Name:"
            onChange={(e) => setFullName(e.target.value)}
          />
          <InputBox
            name="email"
            placeholder="nischal@gmail.com"
            label="Email:"
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordBox
            name="password"
            placeholder="nischal@123"
            label="Password:"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-sm mt-3 text-red-600">{error}</div>}
          <div className="mt-3">
            <PrimaryButton value="Signup" />
          </div>
          <p className="mt-4">
            Already have an account?{" "}
            <Link className="text-blue-500 underline" to="/login">
              Login now...
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
