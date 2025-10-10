import { Button, CardContent, Divider, TextField, Typography } from '@mui/material';
import { Card, CardActions, CardMedia, Chip, CircularProgress, Container, Grid, Rating } from '@mui/material';
import { Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import AxiosInstanse from '../../api/AxiosInstanse';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Slide, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from '/src/components/products/ProductDetails.module.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Controller, useForm } from 'react-hook-form';


export default function ProductDetails() {

    const [value, setValue] = React.useState(2);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const queryClient = useQueryClient();
    const { isLoggedIn } = useOutletContext();
    const { t } = useTranslation();
    const { id } = useParams();
    const { register, control, handleSubmit } = useForm();
    const fetchProduct = async () => {
        const response = await AxiosInstanse.get(`/Customer/Products/${id}`);
        return response.data;
    }


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['product', id],
        queryFn: fetchProduct,
        staleTime: 1000 * 60 * 5
    })


    const onSubmit = async (data) => {
        try {
            const review = {
                'productId': id,
                'comment': data.comment,
                'rate': data.rate
            }
            console.log(review);
            const response = await AxiosUserInstanse.post(`/Customer/Reviews`, review);
            if (response.status === 200) {
                toast.success(t('review_added_successfully'), {
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
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
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
        }
    }
    const addToCart = async (id) => {
        try {
            const response = await AxiosUserInstanse.post(`/Customer/Carts`, { productId: id });
            if (response.status == 200) {
                toast.success(t('product_added_successfully'), {
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
                queryClient.invalidateQueries(['cartItems']);
            }

            else {
                toast.error(t('smth_wrong'), {
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

            }
        } catch (error) {
            toast.error(error.response.data.error, {
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
        }
    }


    if (isError) console.log(error);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh'
                }}
            >
                <CircularProgress size={60} thickness={5} color="primary" />
            </Box>
        );
    }
    return (
        <Box py={12}>

            <Container maxWidth={'lg'} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Card sx={{ boxShadow: "0 8px 24px rgba(0,0,0,0.2)", borderRadius: 3, border: '1px solid #4fc4ca', display: 'flex', gap: 3 }}>
                    {data.subImageUrls.length > 0 ?
                        <Box className={styles.sliderContainer}>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                direction="vertical"
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className={styles.thumbs}
                            >
                                <SwiperSlide>
                                    <img src={data.mainImageUrl} />
                                </SwiperSlide>
                                {data.subImageUrls.map((url, i) => (
                                    <SwiperSlide key={i}>
                                        <img src={url} alt={`slide-${i}`} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#000000',
                                    '--swiper-pagination-color': '#000000',
                                }}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className={styles.main}
                            >
                                <SwiperSlide>
                                    <img src={data.mainImageUrl} />
                                </SwiperSlide>
                                {data.subImageUrls.map((url, i) => (
                                    <SwiperSlide key={i}>
                                        <img src={url} alt={`slide-${i}`} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Box>
                        :
                        <CardMedia
                            component={'img'}
                            alt={'product'}
                            image={data.mainImageUrl}
                            sx={{ height: '100%', width: '40%' }}
                        />
                    }
                    <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                        <Typography component={'h2'} variant='h2' sx={{ fontWeight: 800, fontSize: '18px' }} >{data.name}</Typography>
                        <Typography component={'p'} variant='body1' >{data.description}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography component={'h3'} variant='h4' sx={{ color: '#4fc4ca', fontWeight: 800, fontSize: '18px' }}>{t('Rate')}</Typography>
                            <Rating name="read-only" value={data.rate} readOnly />
                        </Box>

                        <Typography component={'h3'} variant='h6' sx={{ color: '#4fc4ca', fontWeight: 800, fontSize: '18px' }}>{t('Category')} : <Chip label={data.categoryName} /></Typography>
                        <Typography component={'h3'} variant='h6' sx={{ color: '#4fc4ca', fontWeight: 800, fontSize: '18px' }}>{t('Brand')} : <Chip label={data.brandName} /></Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography component={'h3'} variant='h4' sx={{ color: '#4fc4ca', fontWeight: 800, fontSize: '18px' }}>{t('Price')}</Typography>
                            <Typography component={'h3'} variant='h4' sx={{ fontWeight: 700, fontSize: '16px' }} color='textSecondary'>{data.price}$</Typography>

                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography component={'h3'} variant='h4' sx={{ color: '#4fc4ca', fontWeight: 800, fontSize: '18px' }}>{t('quantity')}</Typography>
                            <Typography component={'h3'} variant='h4' sx={{ fontWeight: 700, fontSize: '16px' }} color='textSecondary'>{data.quantity}</Typography>

                        </Box>
                        {isLoggedIn ?
                            <CardActions sx={{ p: 0, width: '100%' }}>
                                <Button variant='contained' sx={{ backgroundColor: '#4fc4ca', color: '#312D5F', width: '100%' }} onClick={() => { addToCart(data.id) }}>{t('Buy')}</Button>
                            </CardActions> : null
                        }
                    </CardContent>

                </Card>
                {data.reviews.length > 0 ?
                    <Card sx={{ boxShadow: "0 8px 24px rgba(0,0,0,0.2)", borderRadius: 3, border: '1px solid #4fc4ca', display: 'flex', gap: 3, p: 4, flexDirection: 'column' }}>
                        <Typography component={'h2'} variant='h5' sx={{ fontWeight: 800 }}>{data.reviews.length} {t(`Reviews`)}
                            <Divider sx={{ width: '80px', backgroundColor: '#4fc4ca', mt: '4px', height: '2px' }}></Divider>
                        </Typography>
                        {data.reviews.map((review, i) => (
                            <Box key={i}>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography component={'h3'} variant='h6' sx={{ color: '#4fc4ca' }}>{review.fullName}</Typography>
                                    <Rating name="read-only" value={review.rate} readOnly sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }} />
                                </Box>
                                <Typography component={'h3'} variant='body'>{review.comment}</Typography>

                            </Box>
                        ))}

                    </Card> : null
                }
                <Card sx={{ boxShadow: "0 8px 24px rgba(0,0,0,0.2)", borderRadius: 3, border: '1px solid #4fc4ca', display: 'flex', gap: 3, p: 4, flexDirection: 'column' }} component={'form'} onSubmit={handleSubmit(onSubmit)}>
                    <Typography component={'h2'} variant='h5' sx={{ fontWeight: 800 }}>{t(`add_review`)}
                        <Divider sx={{ width: '80px', backgroundColor: '#4fc4ca', mt: '4px', height: '2px' }}></Divider>
                    </Typography>
                    <Typography>{t(`product_rating`)}</Typography>
                    <Controller
                        name="rate"
                        defaultValue={2}
                        control={control}
                        render={({ field }) => (
                            <Rating
                                {...field}
                                value={Number(field.value)}
                                onChange={(_, value) => field.onChange(value)}
                            />
                        )}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Review"
                        multiline
                        rows={6}
                        {...register('comment', { required: 'Please write a review' })}
                    />
                    <Button variant='contained' sx={{ backgroundColor: '#4fc4ca', color: '#312D5F', width: '15%' }} type='submit'>{t('submit_review')}</Button>
                </Card>

            </Container>
        </Box>
    )
}
