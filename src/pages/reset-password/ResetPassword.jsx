import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Container, TextField, Typography, Link } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import resetPasswordSchema from '../../validations/ResetPasswordSchema';
import { Grid } from '@mui/joy';
import frame2 from "/src/assets/images/login_register/Frame2.svg";
export default function ResetPassword() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(resetPasswordSchema)
    });
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.patch(`https://kashop1.runasp.net/api/Identity/Account/reset-password`, data);
            if (response.status == 200)
                navigate('/login');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Box className="reset-password-form" py={12}>
            <Container maxWidth="lg" bgcolor="red">
                <Grid container sx={{ borderRadius: 7, boxShadow: "0 8px 24px 8px rgba(0,0,0,0.2)", border: "1px solid #edeaeacc", alignItems: 'stretch' }}>
                    <Grid item xs={12} sm={12} md={5} lg={5} sx={{ display: 'flex' }} >
                        <img src={frame2} width={'100%'} height={'100%'} style={{ objectFit: 'cover' }}></img>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={7}
                        onSubmit={handleSubmit(onSubmit)}
                        component={"form"} sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            my: 6,
                            px: 10,
                            height: '100%'
                        }}>
                        <Typography component={"h1"} variant='h5' sx={{ color: "#312D5F", fontWeight: 800 }}>Step 2</Typography>
                        <Typography component={"h1"} variant='h5' sx={{ fontWeight: 800}}>Reset Password</Typography>
                        <Typography component={"p"} sx={{ color: "#717171", mt: 2 }}>We have sent OTP code via email, please enter it below to reset your password.</Typography>


                        <TextField {...register("email")} id="email" label="Email" variant="outlined" error={errors.email} helperText={errors.email?.message} />
                        <TextField {...register("newPassword")} id="newPassword" label="New Password" variant="outlined" error={errors.newPassword} helperText={errors.newPassword?.message} />
                        <TextField {...register("code")} id="code" label="Code" variant="outlined" error={errors.code} helperText={errors.code?.message} />

                        <Button variant="contained" type='submit' sx={{ background: "#4fc4ca", color: "#312D5F", borderRadius: 2 }} disabled={isLoading}>
                            {isLoading ? <CircularProgress /> : "Reset"}
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
