import React, { useState } from "react";
import PasswordBox from "../components/PasswordBox";
import InputBox from "../components/InputBox";
import PrimaryButton from "../components/PrimaryButton";
import {Link, useNavigate} from "react-router-dom"
import useAuthContext from "../contexts/useAuthContext";

const LoginPage = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const[error, setError] = useState(null);
  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
  };
  if(isAuthenticated){
    navigate('/home')
  }

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h1 className="text-center font-bold text-2xl mb-6">Login</h1>
        <form>
          <InputBox name="email" placeholder="nischal@gmail.com" label="Email:" />
          <PasswordBox name="password" placeholder="nischal@123" label="Password:" />
          {error && (<div className="text-sm mt-3 text-red-600">{error}</div>)}
          <div className="mt-3">
            <PrimaryButton value="Login" onClick={handleLogin} />
          </div>
        </form>
        <p className="mt-4">Don't have an account ? <Link className="text-blue-500 underline" to='/'>Sign up now...</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
