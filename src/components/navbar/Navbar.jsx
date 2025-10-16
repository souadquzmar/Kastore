import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import navImg from "/src/assets/images/navbar/Group.svg";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Badge,
    FormControl,
    InputAdornment,
    InputLabel,
    Select,
    Stack,
} from "@mui/material";
import { Slide, toast } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import i18next from "i18next";
import { useState } from "react";
import { useEffect } from "react";
import AxiosUserInstanse from "../../api/AxiosUserInstanse";
import { useQuery } from "@tanstack/react-query";
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const [lang, setLang] = useState(i18next.language);
    const { t } = useTranslation();
    const { mode, toggleTheme } = useContext(ThemeContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const toggleLanguage = (event) => {
        const newLang = event.target.value;
        i18next.changeLanguage(newLang);
        setLang(newLang);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        window.document.dir = i18next.dir();
    }, [lang]);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("userToken");
        setIsLoggedIn(false);
        toast.success(t('logged_out_successfully'), {
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
        navigate("/login");
    };

    const fetchProfile = async () => {
        const response = await AxiosUserInstanse.get(`/Users/profile`);
        return response;
    }

    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: fetchProfile,
        staleTime: 1000 * 60 * 5
    })
    const fetchProducts = async () => {
        const response = await AxiosUserInstanse.get(`/Customer/Carts`);
        return response;
    }

    const { data: cart } = useQuery({
        queryKey: ['cartItems'],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5
    })
    const cartCount = cart?.data.items.length;
    return (
        <AppBar position="static" sx={(theme) => ({
            backgroundColor:
                theme.palette.mode === 'dark'
                    ? '#1B9CA4' 
                    : '#4FC4CA', 
        })}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mt: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <img src={navImg} width="150" height="80" alt="Logo" />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                            PaperProps={{
                                style: { backgroundColor: "#4FC4CA" },
                            }}
                        >
                            <MenuItem
                                component={RouterLink}
                                to={`/`}
                                onClick={handleCloseNavMenu}
                                disableTypography
                                style={{
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        color: "#16123F",
                                        fontSize: "20px",
                                        fontWeight: 600,
                                        textAlign: "center",
                                        width: "100%",
                                    }}
                                >
                                    {t("Home")}
                                </div>
                            </MenuItem>
                            <MenuItem
                                component={RouterLink}
                                to={`/products/1`}
                                onClick={handleCloseNavMenu}
                                disableTypography
                                style={{
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        color: "#16123F",
                                        fontSize: "20px",
                                        fontWeight: 600,
                                        textAlign: "center",
                                        width: "100%",
                                    }}
                                >
                                    {t("Products")}
                                </div>
                            </MenuItem>
                            <MenuItem
                                component={RouterLink}
                                to={`/aboutus`}
                                onClick={handleCloseNavMenu}
                                disableTypography
                                style={{
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        color: "#16123F",
                                        fontSize: "20px",
                                        fontWeight: 600,
                                        textAlign: "center",
                                        width: "100%",
                                    }}
                                >
                                    {t("about_us")}
                                </div>
                            </MenuItem>

                            {isLoggedIn ? (
                                <MenuItem
                                    component={RouterLink}
                                    to={`/cart`}
                                    onClick={handleCloseNavMenu}
                                    disableTypography
                                    style={{
                                        justifyContent: "center",
                                    }}
                                >
                                    <IconButton component={RouterLink}
                                        to="/cart"
                                        onClick={handleCloseNavMenu}
                                        size="large" aria-label="show cart items" color="inherit" sx={{ height: '50%', color: '#16123F', border: '1.5px solid #16123F', borderRadius: 2, p: 1, backgroundColor: '#ffffff', mr: 5 }} >
                                        <Badge badgeContent={cartCount} color="error" >
                                            <ShoppingCartOutlinedIcon />
                                        </Badge>
                                    </IconButton>
                                </MenuItem>
                            ) : null}

                            {isLoggedIn ? (
                                <MenuItem>
                                    <div>
                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            sx={{ color: '#16123F', border: '1.5px solid #16123F', borderRadius: 2, p: 1, backgroundColor: '#ffffff' }}
                                        >
                                            <AccountCircle />
                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <Button color="text-secondery" component={RouterLink} to={`/profile`} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}> <PersonIcon />{t(`profile`)} </Button>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <Button onClick={() => {
                                                    handleLogout();
                                                }} color="text-secondery" sx={{ display: 'flex', gap: 1, alignItems: 'center' }} > <LogoutIcon /> {t(`logout`)} </Button>
                                            </MenuItem>

                                        </Menu>
                                    </div>
                                </MenuItem>
                            ) : (
                                <Box sx={{ flexGrow: 0 }}>
                                    <MenuItem>
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
                                                width: "100%",
                                            }}
                                        >
                                            {t("login")}
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
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
                                            {t("create_acc")}
                                        </Link>
                                    </MenuItem>
                                </Box>
                            )}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                        <img src={navImg} width="150" height="80" alt="Logo" />
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex", alignItems: "center" },
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, alignItems: 'center' }}>
                            <Button
                                component={RouterLink}
                                to="/"
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: "#16123F",
                                    display: "block",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    mr: 5,
                                }}
                            >
                                {t("Home")}
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/products/1"
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: "#16123F",
                                    display: "block",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    mr: 5,
                                }}
                            >
                                {t("Products")}
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/aboutus"
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: "#16123F",
                                    display: "block",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    mr: 5,
                                }}
                            >
                                {t("about_us")}
                            </Button>

                        </Box>
                        {isLoggedIn ? (
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    justifyContent: "flex-end",
                                    pr: 4,
                                    display: "flex",
                                    ml: 4
                                }}
                            >

                                <IconButton component={RouterLink}
                                    to="/cart"
                                    onClick={handleCloseNavMenu}
                                    size="large" aria-label="show cart items" color="inherit" sx={{ height: '50%', color: '#16123F', border: '1.5px solid #16123F', borderRadius: 2, p: 1, backgroundColor: '#ffffff', mr: 2 }} >
                                    <Badge badgeContent={cartCount} color="error" >
                                        <ShoppingCartOutlinedIcon />
                                    </Badge>
                                </IconButton>

                                <div>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        sx={{ color: '#16123F', border: '1.5px solid #16123F', borderRadius: 2, p: 1, backgroundColor: '#ffffff', mr: 2 }}
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Button color="text-secondery" component={RouterLink} to={`/profile`} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}> <PersonIcon />{t(`profile`)} </Button>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Button onClick={() => {
                                                handleLogout();
                                            }} color="text-secondery" sx={{ display: 'flex', gap: 1, alignItems: 'center' }} > <LogoutIcon /> {t(`logout`)} </Button>
                                        </MenuItem>

                                    </Menu>
                                </div>

                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    gap: 2,
                                    flexDirection: { sm: "column", md: "row" },
                                    justifyContent: "flex-end",
                                    pr: 4,
                                    ml: 4
                                }}
                            >
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
                                    {t("login")}
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
                                    {t("create_acc")}
                                </Link>
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <IconButton onClick={toggleTheme} sx={{ height: "50%" }}>
                            {mode == "light" ? <DarkModeIcon /> : <LightModeIcon />}
                        </IconButton>
                        <FormControl sx={{ width: "110px", borderRadius: 10 }}>
                            <InputLabel id="lang" sx={{ color: "#16123F" }}>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <LanguageIcon sx={{ color: "#16123F" }} />
                                    <Typography
                                        component="p"
                                        variant="subtitle3"
                                        sx={{
                                            fontWeight: 800,
                                            color: "#16123F",
                                            fontSize: "18px",
                                            pt: "1px",
                                        }}
                                    >
                                        {i18next.language.toUpperCase()}
                                    </Typography>
                                </Box>
                            </InputLabel>

                            <Select
                                onChange={toggleLanguage}
                                labelId="lang"
                                label="Language"
                                value=""
                                sx={{
                                    borderRadius: 10,
                                    color: "#16123F",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#16123F",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#16123F",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#16123F",
                                    },
                                }}
                            >
                                <MenuItem value={"en"}>English</MenuItem>
                                <MenuItem value={"ar"}>العربية</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
