import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Container, TextField, Typography, Link } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import forgetPasswordSchema from '../../validations/ForgetPasswordSchema';
import { Grid } from '@mui/joy';
import frame1 from "/src/assets/images/login_register/Frame1.svg"
import AxiosAuthInstanse from '../../api/AxiosAuthInstanse';

export default function ForgetPassword() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(forgetPasswordSchema)
    });
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await AxiosAuthInstanse.post(`/forgot-password`, data);
            if (response.status == 200) {
                navigate('/resetPassword');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Box className="forget-password-form" py={12}>
            <Container maxWidth="md" bgcolor="red">
                <Grid container sx={{ borderRadius: 7, boxShadow: "0 8px 24px 8px rgba(0,0,0,0.2)", border: "1px solid #edeaeacc", alignItems: 'stretch' }}>
                    <Grid item xs={12} sm={12} md={5} lg={5} sx={{ display: 'flex' }}>
                        <img src={frame1} width={'100%'} height={'100%'} style={{ objectFit: 'cover' }}></img>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={7}
                        onSubmit={handleSubmit(onSubmit)}
                        component={"form"} sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            my: 6,
                            px: 6
                        }}>
                        <Typography component={"h1"} variant='h5' sx={{ color: "#312D5F", fontWeight: 800 }}>Step 1</Typography>
                        <Typography component={"h1"} variant='h5' sx={{ fontWeight: 800 }}>Forget Password</Typography>
                        <Typography component={"p"} sx={{ color: "#717171", mt: 2 }}>Please enter your email and we’ll send you a recovery code.</Typography>

                        <TextField {...register("email")} id="email" label="Email" variant="outlined" error={errors.email} helperText={errors.email?.message} />
                        <Button variant="contained" type='submit' sx={{ background: "#4fc4ca", color: "#312D5F", borderRadius: 2 }} disabled={isLoading}>
                            {isLoading ? <CircularProgress /> : "Send Code"}
                        </Button>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Typography component={"p"} sx={{ mr: 1 }}>Remembered your password?</Typography>
                            <Link underline='none' sx={{ color: "#6862A0" }} component={RouterLink} to={'/login'}>Login</Link>

                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
