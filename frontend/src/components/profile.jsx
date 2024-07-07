import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

function Profile(){
    const [username, setUsername] = useState('');
    let auth = localStorage.getItem("access_token");

    useEffect(() => {
      fetch('http://localhost:5000/profile',{
        method: "GET",
        headers:{
          Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer " + auth,
        }
      })
        .then(response => response.json())
        .then(data => setUsername(data));
    }, []);


    return (
      <h1>{username}</h1>
    );
    
}


export default Profile;