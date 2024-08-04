import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import hasJWT from '../api/JWT';
import axios from 'axios';
import MainLayout from './Layout';

function Home(){
    const [username, setUsername] = useState('None');
    const navigate = useNavigate();

    function loginPage(){
      navigate("/login")
    };

    function regPage(){
      navigate("/register")
    };

    const logoutUser = async() => {
      axios.post("http://localhost:5000/logout", {
      })
      .then(function (response){
        alert(response.data.msg)
        localStorage.clear("token")
        localStorage.clear("username")
        localStorage.clear("refreshToken")
        navigate("/")
      })
    };

    return (
      <MainLayout>
          {hasJWT() ? (
              <div>
                  <div>
                      <p>{localStorage.getItem("token")}</p>
                      <button onClick={logoutUser}>Logout</button>
                  </div>
              </div>
          ) : (
              <div>
                  <div>
                      <button onClick={loginPage}>Login</button>
                      <button onClick={regPage}>Signup</button>
                  </div>
              </div>
          )}
      </MainLayout>
  );
}

export default Home;