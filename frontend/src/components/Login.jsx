import axios from 'axios';
import React, {useState}  from 'react';
import { useNavigate } from 'react-router-dom';


function LoginPage(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleLogin = async() => {
      axios.post("http://localhost:5000/login", {
        username: username,
        password: password
      })
      .then(function (response){
        localStorage.setItem("access_token", response.data.access_token)
        localStorage.setItem("refresh_token", response.data.refresh_token)
        localStorage.setItem("username", response.data.username)
        navigate('/')
      })
      .catch(function (error) {
        console.log(error, "error");
        if (error.response.status === 401)
          alert(error.response.data.error)
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
          <button type="button" onClick={handleLogin}>submit</button>
          </div>
        </form>
      </div>
      );
}

export default LoginPage;