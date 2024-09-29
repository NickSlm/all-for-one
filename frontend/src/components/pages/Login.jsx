import axios from 'axios';
import React, {useState}  from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from './Layout';
import { Avatar, Button, Link, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';


function LoginPage(props){
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleLogin = async() => {
      axios.post("http://localhost:5000/login", {
        emailAddress: emailAddress,
        password: password
      })
      .then(function (response){
        props.setToken(response.data.access_token)
        localStorage.setItem("refreshToken", response.data.refresh_token)
        localStorage.setItem("emailAddress", response.data.user)
        navigate('/')
      }).catch((error) => {
        if (error.response.status === 401) {
          alert("bad cred")
        }
      })

    };
      
    return (
      <MainLayout>
        <Container component="main" maxWidth="xs">
          <Box sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow:3,
                  p:3
                }}
          >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
           <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
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
            value={emailAddress} 
            onChange={(e) => setEmailAddress(e.target.value)}
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
          <Link href="/register">
          {"Don't have an account? Sign Up"}
          </Link>
          </Box>
        </Container>
          
      </MainLayout>
      );
}

export default LoginPage;