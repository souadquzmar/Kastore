import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import loginSchema from '../../validations/LoginSchema';
import { Link } from 'react-router-dom';

export default function Login() {

    const {register,handleSubmit,formState:{errors}}= useForm({
        resolver: yupResolver(loginSchema)
    });
    const [isLoading,setIsLoading]= useState(false);
    const onSubmit = async (data) =>{
        setIsLoading(true);
        try{
            const response = await axios.post(`https://kashop1.runasp.net/api/Identity/Account/Login`,data);
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    }
  return (
    <Box className="login-form" py={4}>
        <Container maxWidth="md" bgcolor="red">
            <Typography component={"h1"} variant='h5'>Login Page</Typography>

            <Box 
            onSubmit={handleSubmit(onSubmit)}
            component={"form"} sx={{
                display:"flex",
                flexDirection:"column",
                gap:3,
                mt:4
            }}>
                <TextField {...register("email")} id="email" label="Email" variant="outlined" error={errors.email} helperText={errors.email?.message}/>
                <TextField {...register("password")} id="password" label="Password" variant="outlined" error={errors.password} helperText={errors.password?.message}/>
                <Link underline='none' >Forget Password?</Link>
                <Button variant="contained" type='submit' sx={{background:"#4fc4ca",color:"#312D5F",borderRadius:2}} disabled={isLoading}>
                    {isLoading? <CircularProgress />:"Login"}
                </Button>
            </Box>
        </Container>
    </Box>
  )
}
