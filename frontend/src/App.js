import logo from './logo.svg';
import React, {userState, useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Link} from "react-dom";
import './App.css';

function App() {
  const [data, setdata] = useState({
    name: "",
    date: "",
  });

  useEffect(() => {
    fetch("/get_time").then((res) => 
      res.json().then((data) => {
        setdata({
          name: data.Name,
          date: data.Date,
        });
      })
    );
  }, []);

  return (
    <div className="App">
    <header className="App-header">
      <h1>React and flask</h1>
      {/* Calling a data from setdata for showing */}
      <p>{data.name}</p>
      <p>{data.date}</p>
    </header>
  </div>
  )
  
}

export default App;
