import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Container, TextField, Typography, Link, Alert } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import forgetPasswordSchema from '../../validations/ForgetPasswordSchema';
import { Grid } from '@mui/material';
import frame1 from "/src/assets/images/login_register/Frame1.svg"
import AxiosAuthInstanse from '../../api/AxiosAuthInstanse';
import { useTranslation } from 'react-i18next';

export default function ForgetPassword() {

    const {t} = useTranslation();
    const [serverError, setServerError] = useState("");
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
            if (error.response)
                setServerError(error.response.data.message);
            else
                setServerError("An unexpected server error");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Box className="forget-password-form" py={12}>
            <Container maxWidth="md" bgcolor="red">
                <Grid container sx={{ borderRadius: 7, boxShadow: "0 8px 24px 8px rgba(0,0,0,0.2)", border: "1px solid #edeaeacc", alignItems: 'stretch' }}>
                    <Grid item size={{ xs: 12, sm: 12, md: 5, lg: 5 }} sx={{ display: 'flex' }}>
                        <img src={frame1} width={'100%'} height={'100%'} style={{ objectFit: 'cover', borderRadius: 20 }}></img>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 12, md: 7, lg: 7 }}
                        onSubmit={handleSubmit(onSubmit)}
                        component={"form"} sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            my: 6,
                            px: 6
                        }}>
                        <Typography component={"h1"} variant='h5' sx={(theme) => ({ color: theme.palette.mode === 'dark'? '#a097efff':"#6862A0" ,fontWeight: 800})}>{t('step_1')}</Typography>
                        <Typography component={"h1"} variant='h5' sx={{ fontWeight: 800 }}>{t('forget_pass')}</Typography>
                        <Typography component={"p"} sx={{ mt: 2 }} color='textSecondery'>{t('please_enter_email')}</Typography>

                        <TextField {...register("email")} id="email" label={t('Email')} variant="outlined" error={errors.email} helperText={errors.email?.message} />
                        {serverError && (
                            <Alert severity="error">{serverError}</Alert>
                        )}
                        <Button variant="contained" type='submit' sx={{ background: "#4fc4ca", color: "#312D5F", borderRadius: 2 }} disabled={isLoading}>
                            {isLoading ? <CircularProgress /> : `${t('send_code')}`}
                        </Button>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Typography component={"p"} sx={{ mr: 1 }}>{t('remembered_pass?')}</Typography>
                            <Link underline='none' sx={(theme) => ({ color: theme.palette.mode === 'dark'? '#a097efff':"#6862A0"})} component={RouterLink} to={'/login'}> {t('login')}</Link>

                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
