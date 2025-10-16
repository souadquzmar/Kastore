import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress, Container, IconButton, Link, TextField, Typography ,Grid} from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import registerSchema from '../../validations/RegisterSchema';
import { useNavigate ,Link as RouterLink} from 'react-router-dom';
import WarningIcon from '@mui/icons-material/Warning';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import frame1 from "/src/assets/images/login_register/Frame1.svg";
import AxiosAuthInstanse from '../../api/AxiosAuthInstanse';
import { Slide, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
export default function Register() {

    const {t} = useTranslation();
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await AxiosAuthInstanse.post(`/Register`, data);
            if (response.status == 200){
                toast.success(t('acc_created_successfully'), {
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
        <Box className="register-form" py={12}>
            <Container maxWidth="lg">
                <Grid container sx={{ borderRadius: 7, boxShadow: "0 8px 24px 8px rgba(0,0,0,0.2)", border: "1px solid #edeaeacc",alignItems: 'stretch' }}>
                    <Grid item size={{xs:12 , sm:12 , md:5 , lg:5}} sx={{display:'flex'}} >
                        <img src={frame1} width={'100%'} height={'100%'} style={{objectFit:'cover',borderRadius:20}}></img>
                    </Grid>
                    <Grid item size={{xs:12 , sm:12 , md:7 , lg:7}}
                        onSubmit={handleSubmit(onSubmit)}
                        component={"form"} sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            my: 6,
                            px: 10,
                            height:'100%'
                        }}>
                        <Typography component={"h1"} variant='h5' sx={{ fontWeight: 600 }}>{t('create_new_acc')}</Typography>
                        <Typography component={"p"} color='textSecondery'>{t('join_us_create_acc')}</Typography>
                        <TextField {...register("fullName")} id="fullName" label={t('full_name')} variant="outlined" error={errors.fullName} helperText={errors.fullName?.message} />
                        <TextField {...register("userName")} id="userName" label={t('user_name')} variant="outlined" error={errors.userName} helperText={errors.userName?.message} />
                        <TextField {...register("email")} id="email" label={t('Email')} variant="outlined" error={errors.email} helperText={errors.email?.message} />
                        <TextField {...register("password")} id="password" label={t('Password')} variant="outlined" error={errors.password} helperText={errors.password?.message} />
                        <TextField {...register("phoneNumber")} id="phoneNumber" label={t('phone_num')} variant="outlined" error={errors.phoneNumber} helperText={errors.phoneNumber?.message} />
                        {serverError && (
                            <Alert severity="error">{serverError}</Alert>
                        )}
                        <Button variant="contained" type='submit' sx={{ background: "#4fc4ca", color: "#312D5F", borderRadius: 2 }} disabled={isLoading}>
                            {isLoading ? <CircularProgress /> : `${t('create_new_acc')}`}
                        </Button>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Typography component={"p"} sx={{ mr: 1 }}>{t('already_have_acc?')} </Typography>
                            <Link underline='none' sx={(theme) => ({ color: theme.palette.mode === 'dark'? '#a097efff':"#6862A0" })} component={RouterLink} to={'/login'}>{t('login')} </Link>

                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>

    )
}
