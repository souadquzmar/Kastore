import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import navImg from '/src/assets/images/navbar/Group.svg';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Stack } from "@mui/material";
import { Slide, toast } from 'react-toastify';


export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        toast.success('Logged Out Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
        navigate('/login');
    }
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
                                style: { backgroundColor: '#4FC4CA' },
                            }}

                        >


                            <MenuItem


                                component={RouterLink}
                                to={`/`}
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
                                    Home
                                </div>
                            </MenuItem>
                            <MenuItem


                                component={RouterLink}
                                to={`/products`}
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
                                    Products
                                </div>
                            </MenuItem>
                            <MenuItem


                                component={RouterLink}
                                to={`/aboutus`}
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
                                    About Us
                                </div>
                            </MenuItem>

                            {isLoggedIn ? <MenuItem


                                component={RouterLink}
                                to={`/cart`}
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
                                    Cart
                                </div>
                            </MenuItem> : null
                            }



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


                        <Button

                            component={RouterLink}
                            to='/'
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: '#16123F',
                                display: 'block',
                                fontWeight: 600,
                                fontSize: '16px',
                                mr: 5
                            }}
                        >
                            Home
                        </Button>
                        <Button

                            component={RouterLink}
                            to='/products'
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: '#16123F',
                                display: 'block',
                                fontWeight: 600,
                                fontSize: '16px',
                                mr: 5
                            }}
                        >
                            Products
                        </Button>
                        <Button

                            component={RouterLink}
                            to='/aboutus'
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: '#16123F',
                                display: 'block',
                                fontWeight: 600,
                                fontSize: '16px',
                                mr: 5
                            }}
                        >
                            about us
                        </Button>
                        {isLoggedIn ? <Button

                            component={RouterLink}
                            to='/cart'
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: '#16123F',
                                display: 'block',
                                fontWeight: 600,
                                fontSize: '16px',
                                mr: 5
                            }}
                        >
                            cart
                        </Button> : null}


                    </Box>




                    {isLoggedIn ? <Box sx={{ flexGrow: 0 }} >
                        <Stack direction="row" spacing={2} >
                            <Button
                                onClick={() => { handleLogout() }}
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
                                Log out
                            </Button>
                        </Stack>
                    </Box>

                        : <Box sx={{ flexGrow: 0 }} >
                            <Stack direction="row" spacing={2} >
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
                        </Box>}

                </Toolbar>
            </Container>
        </AppBar>
    );
}
