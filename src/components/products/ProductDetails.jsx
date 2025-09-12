import { CardContent, Typography } from '@mui/joy';
import { Card, CardMedia, Chip, CircularProgress, Container, Grid, Rating } from '@mui/material';
import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getProduct = async () => {
        try {
            const response = await axios.get(`https://kashop1.runasp.net/api/Customer/Products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

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
                <Card sx={{ boxShadow: "0 8px 24px rgba(0,0,0,0.2)", borderRadius: 3, border: '1px solid #4fc4ca', display: 'flex',gap:3 }}>
                    <CardMedia
                        component={'img'}
                        alt={'product'}
                        image={product.mainImageUrl}
                        sx={{ height: '100%', width: '40%' }}
                    />
                    <CardContent sx={{p:4,display:'flex', flexDirection:'column',gap:2}}>
                        <Typography component={'h2'} variant='h4' sx={{fontWeight:800,color:'#000',fontSize:'18px'}}>{product.name}</Typography>
                        <Typography component={'p'} variant='body1' >{product.description}</Typography>
                        <Box sx={{display:'flex',flexDirection:'column'}}>
                            <Typography component={'h3'} variant='h4' sx={{color:'#4fc4ca',fontWeight:800,fontSize:'18px'}}>Rate</Typography>
                            <Rating name="read-only" value={product.rate} readOnly />
                        </Box>
                        
                        <Typography component={'h3'} variant='h6' sx={{color:'#4fc4ca',fontWeight:800,fontSize:'18px'}}>Category : <Chip label={product.categoryName} /></Typography>
                        <Typography component={'h3'} variant='h6' sx={{color:'#4fc4ca',fontWeight:800,fontSize:'18px'}}>Brand : <Chip label={product.brandName} /></Typography>
                        <Box sx={{display:'flex',flexDirection:'column'}}>
                            <Typography component={'h3'} variant='h4' sx={{color:'#4fc4ca',fontWeight:800,fontSize:'18px'}}>Price</Typography>
                            <Typography component={'h3'} variant='h4' sx={{color:'#464545ff',fontWeight:700,fontSize:'16px'}}>{product.price}$</Typography>

                        </Box>
                        
                    </CardContent>

                </Card>
            </Container>
        </Box>
    )
}
