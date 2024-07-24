import axios from 'axios';
import React, {useState}  from 'react';
import { useNavigate } from 'react-router-dom';


function LoginPage(props){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleLogin = async() => {
      axios.post("http://localhost:5000/login", {
        username: username,
        password: password
      })
      .then(function (response){
        props.setToken(response.data.access_token)
        localStorage.setItem("refreshToken", response.data.refresh_token)
        navigate('/profile')
      }).catch((error) => {
        if (error.response.status === 401) {
          alert("bad cred")
        }
      })

    };
      
    return (
      
      <div>
        <form>
          <div>
            <label>Username:</label>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div>
            <label>Password:</label>    
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div>
          <button type="button" onClick={handleLogin}>Login</button>
          </div>
        </form>
      </div>
      );
}

export default LoginPage;