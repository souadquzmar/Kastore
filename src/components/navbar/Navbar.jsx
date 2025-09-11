import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import navImg from '/src/assets/images/navbar/Group.svg';
import { Link, Link as RouterLink } from 'react-router-dom';
import { Stack } from "@mui/material";
import style from "./Navbar.module.css"
const pages = ['Home', 'Products', 'About Us', 'Contacts Us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
        <AppBar position="static" sx={{ backgroundColor: '#4FC4CA' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mr: '200px',
                            mt: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        <img src={navImg} width="150" height="80" alt="Logo" />
                    </Typography>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            onClick={handleOpenNavMenu}
                            color="#16123F"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            PaperProps={{
                                style: { backgroundColor: '#4FC4CA'},
                            }}
                            
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    
                                    key={page}
                                    component={RouterLink}
                                    to={`/${page.toLowerCase()}`}
                                    onClick={handleCloseNavMenu}
                                    disableTypography
                                    style={{
                                        justifyContent: 'center',
                                       
                                    }}
                                    
                                >
                                    <div
                                        style={{
                                            color: '#16123F',
                                            fontSize: '20px',
                                            fontWeight: 600,
                                            textAlign: 'center',
                                            width: '100%',
                                        }}
                                        
                                    >
                                        {page}
                                    </div>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>


                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <img src={navImg} width="150" height="80" alt="Logo" />
                    </Typography>


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                component={RouterLink}
                                to={page == "Home"? `/`:`/${page.toLowerCase()}`}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: '#16123F',
                                    display: 'block',
                                    fontWeight: 600,
                                    fontSize:'16px',
                                    mr:5
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>




                    <Box sx={{ flexGrow: 0 }}>
                        <Stack direction="row" spacing={2}>
                            <Link
                                to="/login"
                                style={{
                                    backgroundColor: "#fff",
                                    color: "#16123F",
                                    textDecoration: "none",
                                    padding: "8px 24px",
                                    borderRadius: "16px",
                                    fontWeight: 500,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                Log in
                            </Link>

                            <Link
                                to="/register"
                                style={{
                                    backgroundColor: "#16123F",
                                    color: "#fff",
                                    textDecoration: "none",
                                    padding: "8px 24px",
                                    borderRadius: "16px",
                                    fontWeight: 500,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                Create Account
                            </Link>
                        </Stack>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
