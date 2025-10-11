import React from 'react'
import AxiosUserInstanse from '../../api/AxiosUserInstanse'
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Card, CardContent, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slide, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Checkout() {

    const { register, control, handleSubmit } = useForm({});
    const { t } = useTranslation();
    const fetchProducts = async () => {
        const response = await AxiosUserInstanse.get(`/Customer/Carts`);
        return response;
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['cartItems'],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5
    });

    const cartCount = data?.data.items.length;
    const cartItems = data?.data.items;
    const onSubmit = async (formData) => {
        const response = await AxiosUserInstanse.post(`/Customer/CheckOut/payment`, {
            paymentMethod: formData.paymentMethod
        });
    }
    if (isError) console.log(error);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress size={60} thickness={5} color="primary" />
            </Box>
        );
    }
    return (
        <Box py={8}>
            <Container>
                <Typography component={'h2'} variant='h5' sx={{ fontWeight: 700, pb: 2 }}>{t('Checkout')}</Typography>
                <Box>
                    <Box sx={{ backgroundColor: '#EDEDED', p: 4, border: '2px solid #b2b0b0ff', borderRadius: 5 }} >
                        <Typography component={'h2'} variant='h6' sx={{ fontWeight: 700, pb: 2 }}>{t('summary')}</Typography>
                        {cartItems.map((product) => (

                            <Box key={product.productId} sx={{
                                p: 2,
                                boxShadow: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',

                            }} >
                                <Typography component={'h2'} variant='h6' sx={{ fontSize: '18px', fontWeight: 800 }}>{product.productName}</Typography>
                                <Typography component={'h2'} variant='h6' sx={{ fontSize: '16px' }} >{product.count}x</Typography>
                                <Typography component={'h2'} variant='h' sx={{ fontSize: '18px' }}>{product.totalPrice}$</Typography>
                            </Box>
                        ))}
                        <Box sx={{ display: 'flex', alignItems: 'center' ,borderTop: '1px solid #b2b0b0ff'}}>
                            <Typography component={'h2'} variant='h' sx={{ fontSize: '20px', pt: 3, flexGrow: 1 }}>{t('cart_total')}</Typography>
                            <Typography component={'h2'} variant='h' sx={{ fontSize: '20px', pt: 3 }}>{data.data.cartTotal}$</Typography>
                        </Box>

                    </Box>
                    <Box
                        onSubmit={handleSubmit(onSubmit)}
                        component={"form"} sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            height: '100%'
                        }}>

                        <Controller control={control} name='paymentMethod' defaultValue={'Visa'}
                            render={({ field }) => (
                                <Box sx={{ backgroundColor: '#e0f7fa', p: 4, border: '1px solid #00acc1', borderRadius: 5, mt: 3 }} >
                                    <FormLabel> <Typography component={'h2'} variant='h6' sx={{ color: '#000', mb: 2 }}>{t('payment_method')}</Typography></FormLabel>
                                    <RadioGroup {...field} row>
                                        <FormControlLabel
                                            value="Visa"
                                            control={<Radio sx={{ display: "none" }} />}
                                            label={
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        px: 4,
                                                        py: 1,
                                                        borderRadius: "12px",
                                                        bgcolor: field.value === "Visa" ? "#b2ebf2" : "#e0f7fa",
                                                        border: field.value === "Visa" ? "2px solid #00acc1" : "2px solid transparent",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <Typography fontWeight="bold">{t("visa")}</Typography>
                                                    <Radio checked={field.value === "Visa"} value="Visa" />
                                                </Box>
                                            }
                                        />
                                        <FormControlLabel
                                            value="Cash"
                                            control={<Radio sx={{ display: "none" }} />}
                                            label={
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        px: 4,
                                                        py: 1,
                                                        borderRadius: "12px",
                                                        bgcolor: field.value === "Cash" ? "#b2ebf2" : "#e0f7fa",
                                                        border: field.value === "Cash" ? "2px solid #00acc1" : "2px solid transparent",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <Typography fontWeight="bold">{t("cash")}</Typography>
                                                    <Radio checked={field.value === "Cash"} value="Cash" />
                                                </Box>
                                            }
                                        />

    
                                    </RadioGroup>
                                </Box>
                            )}
                        />
                        <Button variant='contained' sx={{ backgroundColor: '#4fc4ca', color: '#312D5F', width: '100%' }} type='submit'>{t('pay')}</Button>

                    </Box>
                </Box>

            </Container>
        </Box>
    )
}
