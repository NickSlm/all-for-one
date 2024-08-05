import React, {useState, useEffect} from "react";
import api from "../api/api";
import "./style.css"
import MainLayout from "./Layout";


function Profile(){
    
  const [user, setUser] = useState(null);
  const [imageSrc, setImageSrc] = useState('');


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

  const generateImage = async() => {
    try {
      const response = await api.get('/profile/gen-image', {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(response.data);
      setImageSrc(url);
    } 
    catch (error) {
      console.log(error)
    }

  };


  if (!user){
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <a>Account</a>
    </MainLayout>
    
      
  );
  
}


export default Profile;