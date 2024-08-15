import axios from 'axios';
import React, {useState}  from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from './Layout';
import "./style.css"
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import {createTheme, ThemeProvider} from "@mui/material/styles";

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
        localStorage.setItem("username", username)
        navigate('/')
      }).catch((error) => {
        if (error.response.status === 401) {
          alert("bad cred")
        }
      })

    };
      
    return (
      <MainLayout>
            <Container component="main" maxWidth='xs'>
              <Box 
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockIcon />
                    </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
              </Box>
            </Container>
      </MainLayout>
      );
}

export default LoginPage;