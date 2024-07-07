import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import Home from "./components/Home"
import LoginPage from "./components/Login"
import Register from "./components/Signup"
import Profile from "./components/profile";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  const [user, setUser] = useState(null);


  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
            <Route path="/logout"/>
        </Routes>
      </BrowserRouter>

  );
}

export default App;
