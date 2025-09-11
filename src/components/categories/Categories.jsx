import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCategories = async () => {
        try {
            const response = await axios.get(`https://kashop1.runasp.net/api/Customer/Categories`);
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getCategories();
    }, [])

    if (isLoading) return <CircularProgress />;
    return (
        <Box>
            <Typography
                component={'h2'}
                variant='h4'
                py={5}
                sx={{ fontWeight: 800 }}
            >
                Categories
            </Typography>

            <Grid container spacing={5}>
                {categories.map((category) => (
                    <Grid
                        item
                        key={category.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Card
                            sx={{
                                borderRadius: '50%',
                                width: 100,
                                height: 100,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: 3,
                                cursor: 'pointer',
                                background: 'linear-gradient(135deg, #f9f9f9, #f1f1f1)',
                                transition: 'all 0.35s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-6px) scale(1.07)',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                                    background: 'linear-gradient(135deg, #ffffff, #E6E3FF)',
                                },
                            }}
                        >
                            <CardContent
                                
                            >
                                <Typography
                                    component={'h3'}
                                    variant='subtitle1'
                                    fontWeight={600}
                                    sx={{
                                        textTransform: 'capitalize',
                                        transition: 'color 0.3s',
                                        '&:hover': { color: '#6862A0' },
                                    }}
                                >
                                    {category.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

}
