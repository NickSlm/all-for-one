import React, {useState, useEffect} from "react";
import axios from "axios";
import api from "./api";
// import {useNavigate } from "react-router-dom";

function Profile(){
    
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        setUser(response.data);
      } catch (error) {
        console.error(error)
      }
    };

    fetchProfile();
  },[]);


  if (!user){
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.username}</h1>
    </div>
      
  );
  
}


export default Profile;