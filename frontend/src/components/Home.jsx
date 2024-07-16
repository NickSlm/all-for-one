import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import hasJWT from './JWT';
import axios from 'axios';

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
        localStorage.clear("access_token")
        navigate("/")
      })
    };

    return (
      hasJWT() ?
      <div>
       <div>
       <p>{localStorage.getItem("token")}</p>
        <button onClick={logoutUser}>Logout</button>
       </div>
      </div>:
      <div>
        <div>
          <button onClick={loginPage}>Login</button>
          <button onClick={regPage}>Signup</button>
        </div>
      </div>

    );
}

export default Home;