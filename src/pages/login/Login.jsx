import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Container, TextField, Typography, Link } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import loginSchema from '../../validations/LoginSchema';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/joy';
import frame2 from "/src/assets/images/login_register/Frame2.svg";
export default function Login() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`https://kashop1.runasp.net/api/Identity/Account/Login`, data);
            if (response.status == 200) {
                localStorage.setItem("userToken", response.data.token);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Box className="login-form" py={12}>
            <Container maxWidth="md" bgcolor="red">

                <Grid container sx={{borderRadius:7,boxShadow:"0 8px 24px 8px rgba(0,0,0,0.2)",border:"1px solid #edeaeacc",alignItems: 'stretch'}}>
                    <Grid item xs={12} sm={12} md={5} lg={5} sx={{display:'flex'}}>
                        <img src={frame2} width={'100%'} height={'100%'} style={{objectFit:'cover'}}></img>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={7}
                        onSubmit={handleSubmit(onSubmit)}
                        component={"form"} sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            my:6,
                            px:6
                        }}>
                        <Typography component={"h1"} variant='h5' sx={{ fontWeight: 600 }}>Login Page</Typography>
                        <Typography component={"p"} sx={{ color: "#717171" }}>Good to see you again!</Typography>
                        <TextField {...register("email")} id="email" label="Email" variant="outlined" error={errors.email} helperText={errors.email?.message} />
                        <TextField {...register("password")} id="password" label="Password" variant="outlined" error={errors.password} helperText={errors.password?.message} />
                        <Link underline='none' sx={{ color: "#6862A0" }} component={RouterLink} to={'/forgetPassword'}>Forget Password?</Link>
                        <Button variant="contained" type='submit' sx={{ background: "#4fc4ca", color: "#312D5F", borderRadius: 2 }} disabled={isLoading}>
                            {isLoading ? <CircularProgress /> : "Login"}
                        </Button>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Typography component={"p"} sx={{ mr: 1 }}>Don’t Have an Account?</Typography>
                            <Link underline='none' sx={{ color: "#6862A0" }} component={RouterLink} to={'/register'}>Create Account</Link>

                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
