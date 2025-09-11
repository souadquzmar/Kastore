import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Brands() {

    const [brands,setBrands] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const getBrands = async()=>{
        try {
        const response = await axios.get(`https://kashop1.runasp.net/api/Customer/Brands`);
        setBrands(response.data);
        } catch(error) {
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    }

    useEffect (()=>{
        getBrands();
    }, [])

  if(isLoading) return <CircularProgress />;

  return (
  <Box>
    <Typography
      component={'h2'}
      variant='h4'
      py={5}
      sx={{ fontWeight: 800 }}
    >
      Brands
    </Typography>

    <Grid container spacing={5}>
      {brands.map((brand) => (
        <Grid
          item
          key={brand.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Card
            sx={{
              borderRadius: '50%',
              overflow: 'hidden',
              width: 150,
              height: 150,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 3,
              
              cursor: 'pointer',
              transition: 'all 0.35s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.08)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                
              },
            }}
          >
            <CardMedia
              component='img'
              alt={brand.name}
              image={brand.mainImageUrl}
              sx={{
                width: '70%',
                height: '70%',
                objectFit: 'contain',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
          </Card>

          <Typography
            component={'h3'}
            variant='h6'
            fontWeight={600}
            sx={{
              transition: 'color 0.3s',
              '&:hover': { color: '#4fc4ca' },
            }}
          >
            {brand.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  </Box>
);

}
