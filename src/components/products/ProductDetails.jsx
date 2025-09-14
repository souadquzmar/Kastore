import { Button, CardContent, Typography } from '@mui/material';
import { Card, CardActions, CardMedia, Chip, CircularProgress, Container, Grid, Rating } from '@mui/material';
import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstanse from '../../api/AxiosInstanse';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { useQuery } from '@tanstack/react-query';
import { Slide, toast } from 'react-toastify';

export default function ProductDetails() {

    const { id } = useParams();

    const fetchProduct = async () => {
        const response = await AxiosInstanse.get(`/Products/${id}`);
        return response.data;
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['product', id],
        queryFn: fetchProduct,
        staleTime: 1000 * 60 * 5
    })

    const addToCart = async (id) => {
        try {
            const response = await AxiosUserInstanse.post(`/Carts`, { productId: id });
            if (response.status == 200) {
                toast.success('Product Added Successfully!', {
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

            else {
                toast.error('Something Wrong Happened!', {
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
            <Container maxWidth={'lg'}>
                <Card sx={{ boxShadow: "0 8px 24px rgba(0,0,0,0.2)", borderRadius: 3, border: '1px solid #4fc4ca', display: 'flex', gap: 3 }}>
                    <CardMedia
                        component={'img'}
                        alt={'product'}
                        image={data.mainImageUrl}
                        sx={{ height: '100%', width: '40%' }}
                    />
                    <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography component={'h2'} variant='h2' sx={{ fontWeight: 800, fontSize: '18px' }} >{data.name}</Typography>
                        <Typography component={'p'} variant='body1' >{data.description}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography component={'h3'} variant='h4' sx={{ color: '#4fc4ca', fontWeight: 800, fontSize: '18px' }}>Rate</Typography>
                            <Rating name="read-only" value={data.rate} readOnly />
                        </Box>

                        <Typography component={'h3'} variant='h6' sx={{ color: '#4fc4ca', fontWeight: 800, fontSize: '18px' }}>Category : <Chip label={data.categoryName} /></Typography>
                        <Typography component={'h3'} variant='h6' sx={{ color: '#4fc4ca', fontWeight: 800, fontSize: '18px' }}>Brand : <Chip label={data.brandName} /></Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography component={'h3'} variant='h4' sx={{ color: '#4fc4ca', fontWeight: 800, fontSize: '18px' }}>Price</Typography>
                            <Typography component={'h3'} variant='h4' sx={{ fontWeight: 700, fontSize: '16px' }} color='textSecondary'>{data.price}$</Typography>

                        </Box>
                        <CardActions sx={{ p: 0, width: '100%' }}>
                            <Button variant='contained' sx={{ backgroundColor: '#4fc4ca', color: '#312D5F', width: '100%' }} onClick={() => { addToCart(data.id) }}>Buy</Button>
                        </CardActions>
                    </CardContent>

                </Card>
            </Container>
        </Box>
    )
}
