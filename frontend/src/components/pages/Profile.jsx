import React, {useState, useEffect} from "react";
import api from "../../api/api";
import { CircularProgress } from "@mui/material";
import MainLayout from "./Layout";


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
    return <div><CircularProgress/></div>;
  }

  return (
    <MainLayout>
      <a>Account</a>
    </MainLayout>
    
      
  );
  
}


export default Profile;