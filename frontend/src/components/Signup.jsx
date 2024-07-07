import React, {useState} from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";


function Register(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = async() => {
      axios.post("http://localhost:5000/register", {
        username: username,
        password: password
      })
      .then(function (response){
        alert("Username has been created")
        navigate('/login')
      })
      .catch(function (error) {
        console.log(error, "error");
        if (error.response.status === 200)
          alert(error.response.data.error)
      })
    };


    return (
      <div>
        <form>
          <div>
            <label>Username:  </label>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div>
            <label>Password: </label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div>
          <button type="button" onClick={handleSignup}>submit</button>
          </div>
        </form>
      </div>
    );
    
}


export default Register;