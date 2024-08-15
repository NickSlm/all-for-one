import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import Home from "./components/pages/Home"
import LoginPage from "./components/pages/Login"
import Profile from "./components/pages/Profile"
import Register from "./components/pages/Signup"
import Generate from "./components/pages/Generate";
import PrivateRoute from "./api/PrivateRoute";
import useToken from "./api/useToken";


function App() {

  const {token , removeToken, setToken, } = useToken();

  return (
      <BrowserRouter>
        <Routes>
            <Route index element={<Home removeToken={removeToken}/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
            <Route path="/generate-image" element={<Generate/>}/>
            <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>

  );
}

export default App;
