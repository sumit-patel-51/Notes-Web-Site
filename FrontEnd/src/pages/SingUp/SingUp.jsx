import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../util/helper";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance.js";


function SingUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSingUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please Enter Name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please Enter Valid Email Address");
      return;
    }
    if (!password) {
      setError("Please Enter Password");
      return;
    }
    setError("");

    //Singup API call
    try {
      const responce = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if(responce.data && responce.data.error) {
        setError(responce.data.message)
        return
      }

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
          <form onSubmit={handleSingUp}>
            <h1 className="mb-7 text-2xl">Sing Up</h1>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              type="text"
              placeholder="Password"
              className="input-box"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-600 text-xs pb-2">{error}</p>}
            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-700 underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SingUp;
