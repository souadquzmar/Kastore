import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Container, TextField, Typography, Link } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import forgetPasswordSchema from '../../validations/ForgetPasswordSchema';

export default function ForgetPassword() {

    const navigate = useNavigate();
    const {register,handleSubmit,formState:{errors}}= useForm({
        resolver: yupResolver(forgetPasswordSchema)
    });
    const [isLoading,setIsLoading]= useState(false);
    const onSubmit = async (data) =>{
        setIsLoading(true);
        try{
            const response = await axios.post(`https://kashop1.runasp.net/api/Identity/Account/forgot-password`,data);
            if(response.status == 200){
                navigate('/resetPassword');
            }
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    }
  return (
    <Box className="forget-password-form" py={4}>
        <Container maxWidth="md" bgcolor="red">
            <Typography component={"h1"} variant='h5' sx={{color:"#312D5F",fontWeight:800}}>Step 1</Typography>
            <Typography component={"h1"} variant='h5' sx={{fontWeight:800,mt:2}}>Forget Password</Typography>
            <Typography component={"p"} sx={{color:"#717171",mt:2}}>Please enter your email and we’ll send you a recovery code.</Typography>
            <Box 
            onSubmit={handleSubmit(onSubmit)}
            component={"form"} sx={{
                display:"flex",
                flexDirection:"column",
                gap:3,
                mt:4
            }}>
                <TextField {...register("email")} id="email" label="Email" variant="outlined" error={errors.email} helperText={errors.email?.message}/>                
                <Button variant="contained" type='submit' sx={{background:"#4fc4ca",color:"#312D5F",borderRadius:2}} disabled={isLoading}>
                    {isLoading? <CircularProgress />:"Send Code"}
                </Button>
                <Box sx={{display:"flex",justifyContent:"center"}}>
                    <Typography component={"p"} sx={{mr:1}}>Remembered your password?</Typography>
                    <Link underline='none' sx={{color:"#6862A0"}} component={RouterLink} to={'/login'}>Login</Link>
                    
                </Box>

            </Box>
        </Container>
    </Box>
  )
}
