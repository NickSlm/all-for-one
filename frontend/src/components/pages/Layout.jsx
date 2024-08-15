import React from 'react';
import {Link} from 'react-router-dom';
import hasJWT from '../../api/JWT';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { IconButton,Tooltip ,Button, Box, AppBar,Toolbar, Typography, Avatar,MenuItem,Menu, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb'


const routes = {
    Generate: "/generate-image",
    FAQ: "/FAQ"
}
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const profile_routes = {
    Generate: "/generate-image",
    FAQ: "/FAQ"
}

const MainLayout = ({children}) => {

    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };


    const handlelogoutUser = async() => {
        axios.post("http://localhost:5000/logout", {
        })
        .then(function (response){
          alert(response.data.msg)
          localStorage.clear("token")
          localStorage.clear("username")
          localStorage.clear("refreshToken")
          handleCloseUserMenu()
          navigate("/")
        })
      };


    return (
        <div>
            <header>
            <AppBar position="static" >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        AFO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                        {Object.keys(profile_routes).map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography component={Link} to={profile_routes[page]} textAlign="center">
                                    {page}
                                </Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        AFO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {Object.keys(routes).map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to={routes[page]}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {hasJWT() ? (
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        )
                        : 
                        (
                        <Button component={Link} to="/login" color="inherit">Login</Button>
                        )}
                        

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                                <MenuItem component={Link} to="/profile">
                                <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <MenuItem>
                                <Typography textAlign="center">Account</Typography>
                                </MenuItem>
                                <MenuItem>
                                <Typography textAlign="center">Dashboard</Typography>
                                </MenuItem>
                                <MenuItem onClick={handlelogoutUser}>
                                <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                        </Menu>
                    </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            </header>
            <main>
                {children}
            </main>
            <footer>
                footer
            </footer>
        </div>
    )
};

export default MainLayout;