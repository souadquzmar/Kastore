import { Divider } from '@mui/joy';
import { 
  Box, 
  CircularProgress, 
  Typography 
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AxiosInstanse from '../../api/AxiosInstanse';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    try {
      const response = await AxiosInstanse.get(`/Categories`);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '40vh' 
        }}
      >
        <CircularProgress size={50} thickness={4} color="primary" />
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        component="h2"
        variant="h5"
        pt={6}
        pb={3}
        sx={{ fontWeight: 800 }}
      >
        Categories
         <Divider sx={{width:'150px', backgroundColor:'#AE75DA',mt:'4px',height:'2px'}}></Divider>
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        {categories.map((category) => (
          <Box
            key={category.id}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: '50px',
              bgcolor: 'white',
              border: '2px solid #e0e0e0',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              '&:hover': {
                borderColor: '#AE75DA',
                color: '#AE75DA',
                transform: 'translateY(-3px)',
                boxShadow: '0 6px 14px rgba(0,0,0,0.12)',
              },
            }}
          >
            {category.name}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
