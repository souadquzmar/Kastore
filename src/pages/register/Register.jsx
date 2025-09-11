import { yupResolver } from '@hookform/resolvers/yup';
import {Box, Button, CircularProgress, Container, IconButton, TextField, Typography } from '@mui/material'
import Alert from '@mui/joy/Alert';
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import registerSchema from '../../validations/RegisterSchema';
import { useNavigate } from 'react-router-dom';
import WarningIcon from '@mui/icons-material/Warning';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function Register() {

    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`https://kashop1.runasp.net/api/Identity/Account/Register`, data);
            if (response.status == 200)
                navigate('/login');
        } catch (error) {
            if (error.response)
                setServerError(error.response.data.message);
            else
                setServerError("An unexpected server error");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Box className="register-form" py={4}>
            <Container maxWidth="md" bgcolor="red">
                <Typography component={"h1"} variant='h5'>Register Page</Typography>

                <Box
                    onSubmit={handleSubmit(onSubmit)}
                    component={"form"} sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        mt: 4
                    }}>
                    
                    <TextField {...register("fullName")} id="fullName" label="Full Name" variant="outlined" error={errors.fullName} helperText={errors.fullName?.message} />
                    <TextField {...register("userName")} id="userName" label="User Name" variant="outlined" error={errors.userName} helperText={errors.userName?.message} />
                    <TextField {...register("email")} id="email" label="Email" variant="outlined" error={errors.email} helperText={errors.email?.message} />
                    <TextField {...register("password")} id="password" label="Password" variant="outlined" error={errors.password} helperText={errors.password?.message} />
                    <TextField {...register("phoneNumber")} id="phoneNumber" label="Phone Number" variant="outlined" error={errors.phoneNumber} helperText={errors.phoneNumber?.message} />
                    {serverError && (
                        <Alert
                            key='Error'
                            sx={{ alignItems: 'flex-start' }}
                            startDecorator= {<WarningIcon/>}
                            variant="soft"
                            color='danger'
                            
                        >
                            <div>
                                <div>Error</div>
                                <Typography level="body-sm" color='danger'>
                                    {serverError}
                                </Typography>
                            </div>
                        </Alert>
                    )}
                    <Button variant="contained" type='submit' sx={{ background: "#4fc4ca", color: "#312D5F", borderRadius: 2 }} disabled={isLoading}>
                        {isLoading ? <CircularProgress /> : "Register"}
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}
