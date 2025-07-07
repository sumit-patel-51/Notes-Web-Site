import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../util/helper";
import axiosInstance from "../../util/axiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please Enter a Valid Email Address");
      return;
    }
    setError("");

    if (!password) {
      setError("Please Enter Password");
    }

    // Login API call
    try {
      const responce = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (responce.data && responce.data.accessToken) {
        localStorage.setItem("token", responce.data.accessToken);
        navigate('/dashboard')
      }
    } catch (error) {
      if(error.responce && error.responce.data && error.responce.data.message){
        setError(error.responce.data.message)
      }
      else {
        setError('An unexpected error occured. Please try again.')
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h1 className="mb-7 text-2xl">Login</h1>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              values={password}
              placeholder={"Password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-600 text-xs pb-2">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not Register yet?{" "}
              <Link
                to={"/singup"}
                className="font-mediu text-blue-800 underline"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
