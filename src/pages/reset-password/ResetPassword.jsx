import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Container, TextField, Typography, Link, Alert } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import resetPasswordSchema from '../../validations/ResetPasswordSchema';
import { Grid } from '@mui/material';
import frame2 from "/src/assets/images/login_register/Frame2.svg";
import AxiosAuthInstanse from '../../api/AxiosAuthInstanse';
import { Slide, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
export default function ResetPassword() {

    const {t} = useTranslation();
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(resetPasswordSchema)
    });
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await AxiosAuthInstanse.patch(`/reset-password`, data);
            if (response.status == 200){
                toast.success(t('pass_reset_successfully'), {
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
                navigate('/login');
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
        <Box className="reset-password-form" py={12}>
            <Container maxWidth="lg" bgcolor="red">
                <Grid container sx={{ borderRadius: 7, boxShadow: "0 8px 24px 8px rgba(0,0,0,0.2)", border: "1px solid #edeaeacc", alignItems: 'stretch' }}>
                    <Grid item size={{ xs: 12, sm: 12, md: 5, lg: 5 }} sx={{ display: 'flex' }} >
                        <img src={frame2} width={'100%'} height={'100%'} style={{ objectFit: 'cover', borderRadius: 20 }}></img>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 12, md: 7, lg: 7 }}
                        onSubmit={handleSubmit(onSubmit)}
                        component={"form"} sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            my: 6,
                            px: 10,
                            height: '100%'
                        }}>
                        <Typography component={"h1"} variant='h5' sx={{ color: "#312D5F", fontWeight: 800 }}>{t('step_2')}</Typography>
                        <Typography component={"h1"} variant='h5' sx={{ fontWeight: 800 }}>{t('reset_pass')} </Typography>
                        <Typography component={"p"} sx={{ mt: 2 }} color='textSecondery'>{t('code_sent_to_email_to_reset')}</Typography>


                        <TextField {...register("email")} id="email" label={t('Email')} variant="outlined" error={errors.email} helperText={errors.email?.message} />
                        <TextField {...register("newPassword")} id="newPassword" label={t('new_pass')} variant="outlined" error={errors.newPassword} helperText={errors.newPassword?.message} />
                        <TextField {...register("code")} id="code" label={t('code')} variant="outlined" error={errors.code} helperText={errors.code?.message} />
                        {serverError && (
                            <Alert severity="error">{serverError}</Alert>
                        )}
                        <Button variant="contained" type='submit' sx={{ background: "#4fc4ca", color: "#312D5F", borderRadius: 2 }} disabled={isLoading}>
                            {isLoading ? <CircularProgress /> : `${t('reset')}`}
                        </Button>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Typography component={"p"} sx={{ mr: 1 }}>{t('remembered_pass?')}</Typography>
                            <Link underline='none' sx={{ color: "#6862A0" }} component={RouterLink} to={'/login'}>{t('login')}</Link>

                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
