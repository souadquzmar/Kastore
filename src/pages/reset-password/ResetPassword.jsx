import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Container, TextField, Typography, Link } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import resetPasswordSchema from '../../validations/ResetPasswordSchema';

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
            if(response.status == 200)
                navigate('/login');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Box className="reset-password-form" py={4}>
            <Container maxWidth="md" bgcolor="red">
                <Typography component={"h1"} variant='h5' sx={{ color: "#312D5F", fontWeight: 800 }}>Step 2</Typography>
                <Typography component={"h1"} variant='h5' sx={{ fontWeight: 800, mt: 2 }}>Reset Password</Typography>
                <Typography component={"p"} sx={{ color: "#717171", mt: 2 }}>We have sent OTP code via email, please enter it below to reset your password.</Typography>

                <Box
                    onSubmit={handleSubmit(onSubmit)}
                    component={"form"} sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        mt: 4
                    }}>
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
                </Box>
            </Container>
        </Box>
    )
}
