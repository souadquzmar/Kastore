import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Container, TextField, Typography, Link, Alert } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import loginSchema from '../../validations/LoginSchema';
import { Link as RouterLink, useNavigate, useOutletContext } from 'react-router-dom';
import { Grid } from '@mui/material';
import frame2 from "/src/assets/images/login_register/Frame2.svg";
import AxiosAuthInstanse from '../../api/AxiosAuthInstanse';
import { Slide, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
export default function Login() {

    const {t} = useTranslation();
    const [serverError, setServerError] = useState("");
    const { setIsLoggedIn } = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await AxiosAuthInstanse.post(`/Login`, data);
            if (response.status == 200) {
                localStorage.setItem("userToken", response.data.token);
                setIsLoggedIn(true);
                toast.success(t('logged_in_successfully'), {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
                navigate('/');
            }
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
        <Box className="login-form" py={12}>
            <Container maxWidth='md'>

                <Grid container direction="row" sx={{ borderRadius: 7, boxShadow: "0 8px 24px 8px rgba(0,0,0,0.2)", border: "1px solid #edeaeacc" }} >
                    <Grid item size={{ xs: 12, sm: 12, md: 5, lg: 5 }}>
                        <img src={frame2} width={'100%'} height={'100%'} style={{ objectFit: 'cover', borderRadius: 20 }}></img>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 12, md: 7, lg: 7 }}
                        onSubmit={handleSubmit(onSubmit)}
                        component="form" sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            p: 6,

                        }}>
                        <Typography component={"h1"} variant='h5' sx={{ fontWeight: 600 }}>{t('login_page')}</Typography>
                        <Typography component={"p"} color='textSecondery'>{t('good_to_see_u_again')}</Typography>
                        <TextField {...register("email")} id="email" label={t('Email')} variant="outlined" error={errors.email} helperText={errors.email?.message} />
                        <TextField {...register("password")} id="password" label={t('Password')} variant="outlined" error={errors.password} helperText={errors.password?.message} />
                        {serverError && (
                            <Alert severity="error">{serverError}</Alert>
                        )}
                        <Link underline='none' sx={{ color: "#6862A0" }} component={RouterLink} to={'/forgetPassword'}>{t('forget_pass?')}</Link>
                        <Button variant="contained" type='submit' sx={{ background: "#4fc4ca", color: "#312D5F", borderRadius: 2 }} disabled={isLoading}>
                            {isLoading ? <CircularProgress /> : `${t('login')}`}
                        </Button>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Typography component={"p"} sx={{ mr: 1 }}>{t('dont_have_acc?')}</Typography>
                            <Link underline='none' sx={{ color: "#6862A0" }} component={RouterLink} to={'/register'}>{t('create_acc')}</Link>

                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
