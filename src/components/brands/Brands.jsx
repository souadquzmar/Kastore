import { Divider } from '@mui/material';
import { 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  CircularProgress, 
  Grid, 
  Typography 
} from '@mui/material';
import AxiosInstanse from '../../api/AxiosInstanse';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function Brands() {
  
  const { t } = useTranslation();

  const fetchBrands = async ()=>{
    const response = await AxiosInstanse.get(`/Customer/Brands`);
    return response;
  }

  const {data,isLoading,isError,error} = useQuery({
    queryKey:['Brands'],
    queryFn:fetchBrands,
    staleTime:1000 * 60 * 5
  })

  if(isError) console.log(error);
  if (isLoading) 
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

  return (
    <Box>
      
      <Typography
        component={'h2'}
        variant='h5'
        pb={3}
        pt={6}
        sx={{ fontWeight: 800 }}
      >
        {t('Brands')}
        <Divider sx={{width:'100px', backgroundColor:'#4fc4ca',mt:'4px',height:'2px'}}></Divider>
      </Typography>
      
      <Grid container spacing={4}>
        {data.data.map((brand) => (
          <Grid
            item
            key={brand.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                width: 150,
                height: 150,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.35s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.05)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
                  border: '2px solid #4fc4ca',
                },
              }}
            >
              <CardMedia
                component="img"
                alt={brand.name}
                image={brand.mainImageUrl}
                sx={{
                  width: '70%',
                  height: '70%',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.1)' },
                }}
              />
              <CardContent sx={{ textAlign: 'center', p: 1 }}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    transition: 'color 0.3s',
                    '&:hover': { color: '#4fc4ca' },
                  }}
                >
                  {brand.name}
                </Typography>
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
