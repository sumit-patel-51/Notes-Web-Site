import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import SingUp from "./pages/SingUp/SingUp.jsx";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" exact element={<Home />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/singup" exact element={<SingUp />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
