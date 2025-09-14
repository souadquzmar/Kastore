import { Box, Grid } from '@mui/material'
import { Container, Divider, IconButton, Typography } from '@mui/material'
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const {t} = useTranslation();
    return (
        <Box sx={{ backgroundColor: '#000' }}>
            <Container display={'flex'} >
                <Grid container spacing={8}>
                    <Grid item py={4} size={{xs:12,sm:6,md:4,lg:3}}>
                        <Typography component={'h4'} variant='h6' sx={{ color: "#fff", fontWeight: 700 }}>{t('follow_us')}</Typography>
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

                    <Grid item py={4} size={{xs:12,sm:6,md:4,lg:3}}>
                        <Typography component={'h4'} variant='h6' sx={{ color: "#fff", fontWeight: 700 }}>{t('our_products')} </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }} >
                            <Typography component={'p'} color='#fff'>{t('all_products')} </Typography>
                            <Typography component={'p'} color='#fff'>{t('laptops')} </Typography>
                            <Typography component={'p'} color='#fff'>{t('smartphones')}</Typography>
                            <Typography component={'p'} color='#fff'>{t('playstation')}</Typography>
                            <Typography component={'p'} color='#fff'>{t('smartwatch')}</Typography>
                        </Box>
                    </Grid>
                    <Grid item py={4} size={{xs:12,sm:6,md:4,lg:3}}>
                        <Typography component={'h4'} variant='h6' sx={{ color: "#fff", fontWeight: 700 }}>{t('links')}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }} >
                            <Typography component={'p'} color='#fff'>{t('terms')}</Typography>
                            <Typography component={'p'} color='#fff'>{t('privacy_policy')}</Typography>
                            <Typography component={'p'} color='#fff'>{t('refund_policy')}</Typography>
                        </Box>
                    </Grid>
                    <Grid item py={4} size={{xs:12,sm:6,md:4,lg:3}}>
                        <Typography component={'h4'} variant='h6' sx={{ color: "#fff", fontWeight: 700 }}>{t('site_pages')}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }} >
                            <Typography component={'p'} color='#fff'>{t('homepage')}</Typography>
                            <Typography component={'p'} color='#fff'>{t('about_ka')}</Typography>
                            <Typography component={'p'} color='#fff'>{t('shop')}</Typography>
                            <Typography component={'p'} color='#fff'>{t('contact_us')}</Typography>
                        </Box>
                    </Grid>


                </Grid>
                <Divider sx={{ borderColor: "#ffffff", mt: 3, width: '100%' }} />
                <Grid container py={3} sx={{display:'flex',alignItems:'center'}} spacing={2}>
                    <Grid item size={{xs:12,sm:6,md:4,lg:3}}>
                        <Box display={'flex'} sx={{ flexDirection: 'column' }}>
                            <Typography component={'p'} color='#ffffff'>{t('sun_to_thur')}</Typography>
                            <Typography component={'p'} color='#ffffff'>{t('9-7')}</Typography>
                        </Box>
                    </Grid>
                    <Grid item size={{xs:12,sm:6,md:4,lg:3}}>
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
                                    gap: 1.5,
                                    width: "200px",
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
                                <Typography sx={{ fontSize: "16px", fontWeight: 500 ,width:'fit-content'}}>
                                    {t('location')}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                     <Grid item size={{xs:12,sm:6,md:4,lg:3}}></Grid>
                    <Grid item size={{xs:12,sm:6,md:4,lg:3}} >
                        <Typography component={'p'} color='#ffffff'>{t('rights_reserved')}</Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
