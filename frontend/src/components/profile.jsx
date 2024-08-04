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
      <div>
        <div><button type="button" onClick={generateImage}>Generate</button>
        <button>Save</button>
        <button>Export</button></div>
        <div><img src={imageSrc} style={{ width: '64px', height: 'auto' }}/></div>
      </div>
    </MainLayout>
    
      
  );
  
}


export default Profile;