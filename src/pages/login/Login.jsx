import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Container, TextField, Typography, Link } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import loginSchema from '../../validations/LoginSchema';
import { Link as RouterLink, useNavigate} from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();
    const {register,handleSubmit,formState:{errors}}= useForm({
        resolver: yupResolver(loginSchema)
    });
    const [isLoading,setIsLoading]= useState(false);
    const onSubmit = async (data) =>{
        setIsLoading(true);
        try{
            const response = await axios.post(`https://kashop1.runasp.net/api/Identity/Account/Login`,data);
            if(response.status == 200){
                localStorage.setItem("userToken",response.data.token);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    }
  return (
    <Box className="login-form" py={12}>
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
                <Link underline='none' sx={{color:"#6862A0"}} component={RouterLink} to={'/forgetPassword'}>Forget Password?</Link>
                <Button variant="contained" type='submit' sx={{background:"#4fc4ca",color:"#312D5F",borderRadius:2}} disabled={isLoading}>
                    {isLoading? <CircularProgress />:"Login"}
                </Button>
            </Box>
        </Container>
    </Box>
  )
}
