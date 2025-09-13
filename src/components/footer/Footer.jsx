import { Box, Grid } from '@mui/material'
import { Container, Divider, IconButton, Typography } from '@mui/material'
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React from 'react'

export default function Footer() {
    return (
        <Box sx={{ backgroundColor: '#000' }}>
            <Container display={'flex'} >
                <Grid container spacing={8}>
                    <Grid item py={4} xs={12} sm={6} md={4} lg={3}>
                        <Typography component={'h4'} variant='h6' sx={{ color: "#fff", fontWeight: 700 }}>Follow Us</Typography>
                        <Box display="flex" gap={2} py={4}>

                            <IconButton
                                component="a"
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    border: "2px solid #4FC4CA",
                                    color: "#4FC4CA",
                                    width: 50,
                                    height: 50,
                                    borderRadius: "50%",
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "rgba(79, 196, 202, 0.1)",
                                        transform: "scale(1.1)",
                                    },
                                }}
                            >
                                <InstagramIcon />
                            </IconButton>

                            <IconButton
                                component="a"
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    border: "2px solid #4FC4CA",
                                    color: "#4FC4CA",
                                    width: 50,
                                    height: 50,
                                    borderRadius: "50%",
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "rgba(79, 196, 202, 0.1)",
                                        transform: "scale(1.1)",
                                    },
                                }}
                            >
                                <PinterestIcon />
                            </IconButton>
                            <IconButton
                                component="a"
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    border: "2px solid #4FC4CA",
                                    color: "#4FC4CA",
                                    width: 50,
                                    height: 50,
                                    borderRadius: "50%",
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "rgba(79, 196, 202, 0.1)",
                                        transform: "scale(1.1)",
                                    },
                                }}
                            >
                                <TwitterIcon />
                            </IconButton>
                            <IconButton
                                component="a"
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    border: "2px solid #4FC4CA",
                                    color: "#4FC4CA",
                                    width: 50,
                                    height: 50,
                                    borderRadius: "50%",
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "rgba(79, 196, 202, 0.1)",
                                        transform: "scale(1.1)",
                                    },
                                }}
                            >
                                <EmailIcon />
                            </IconButton>
                        </Box>
                    </Grid>

                    <Grid item py={4} xs={12} sm={6} md={4} lg={3}>
                        <Typography component={'h4'} variant='h6' sx={{ color: "#fff", fontWeight: 700 }}>Our Products</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }} >
                            <Typography component={'p'} color='#fff'>All Products</Typography>
                            <Typography component={'p'} color='#fff'>Laptops</Typography>
                            <Typography component={'p'} color='#fff'>Smartphones</Typography>
                            <Typography component={'p'} color='#fff'>PlayStation</Typography>
                            <Typography component={'p'} color='#fff'>All Products</Typography>
                            <Typography component={'p'} color='#fff'>Smartwatch</Typography>
                        </Box>
                    </Grid>
                    <Grid item py={4} xs={12} sm={6} md={4} lg={3}>
                        <Typography component={'h4'} variant='h6' sx={{ color: "#fff", fontWeight: 700 }}>Links</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }} >
                            <Typography component={'p'} color='#fff'>Terms & Conditions</Typography>
                            <Typography component={'p'} color='#fff'>Privacy Policy</Typography>
                            <Typography component={'p'} color='#fff'>Refund & Return Policy</Typography>
                        </Box>
                    </Grid>
                    <Grid item py={4} xs={12} sm={6} md={4} lg={3}>
                        <Typography component={'h4'} variant='h6' sx={{ color: "#fff", fontWeight: 700 }}>Site Pages</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }} >
                            <Typography component={'p'} color='#fff'>Homepage</Typography>
                            <Typography component={'p'} color='#fff'>About KA Store</Typography>
                            <Typography component={'p'} color='#fff'>Shop</Typography>
                            <Typography component={'p'} color='#fff'>Contact Us</Typography>
                        </Box>
                    </Grid>


                </Grid>
                <Divider sx={{ borderColor: "#ffffff", mt: 3, width: '100%' }} />
                <Grid container py={3} sx={{display:'flex',alignItems:'center'}} spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Box display={'flex'} sx={{ flexDirection: 'column' }}>
                            <Typography component={'p'} color='#ffffff'>Sunday to Thursday</Typography>
                            <Typography component={'p'} color='#ffffff'>09 AM — 07 PM</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Box display="flex" gap={2}>

                            <IconButton
                                component="a"
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    border: "2px solid #ffffff",
                                    color: "#ffffff",
                                    width: 50,
                                    height: 50,
                                    borderRadius: "50%",
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "rgba(79, 196, 202, 0.1)",
                                        transform: "scale(1.1)",
                                    },
                                }}
                            >
                                <PhoneIcon />
                            </IconButton>
                            <IconButton
                                component="a"
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    border: "2px solid #ffffff",
                                    color: "#ffffff",
                                    width: 50,
                                    height: 50,
                                    borderRadius: "50%",
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "rgba(79, 196, 202, 0.1)",
                                        transform: "scale(1.1)",
                                    },
                                }}
                            >
                                <EmailIcon />
                            </IconButton>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "#2b2b2b",
                                    color: "#fff",
                                    borderRadius: "50px",
                                    pr:3,
                                    
                                    gap: 1.5,
                                    width: "fit-content",
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: "#5b5858ff", 
                                        borderRadius: "50%",
                                        width: 50,
                                        height: '100%',
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <LocationOnIcon sx={{ color: "#fff", fontSize: 20 }} />
                                </Box>
                                <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                                    Location
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography component={'p'} color='#ffffff'>KA Store © 2025 | All Rights Reserved</Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
