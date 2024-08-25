import React, {useState} from "react";
import axios from "axios";
import {useNavigate, Link } from "react-router-dom";
import MainLayout from "./Layout";
import "./style.css"
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';


function Register(){

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const navigate = useNavigate();

    const handleSignup = async() => {
      axios.post("http://localhost:5000/register", {
        emailAddress: emailAddress,
        password: password,
        firstName: firstName,
        lastName: lastName
      })
      .then(function (response){
        alert("Account has been created")
        navigate('/login')
      })
      .catch(function (error) {
        console.log(error, "error");
        if (error.response.status === 200)
          alert(error.response.data.error)
      })
    };


    return (
      <MainLayout>
        <Container component="main" maxWidth="xs">
          <Box 
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main"}}>
              <LockIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="give-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="family-name"
                  name="lastName"
                  required
                  fullWidth
                  id="firstName"
                  label="Last Name"
                  autoFocus
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt:3, mb:2}}
              onClick={handleSignup}
            >
              Sign Up
            </Button>
            <Link to="/login">
                 Already have an account? Sign In
            </Link>
          </Box>
        </Container>
      </MainLayout>
      
    );
    
}


export default Register;