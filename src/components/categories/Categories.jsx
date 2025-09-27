import { Divider } from '@mui/material';
import {
  Box,
  CircularProgress,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AxiosInstanse from '../../api/AxiosInstanse';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function Categories() {

  const { t } = useTranslation();
  const fetchCategories = async () => {

    const response = await AxiosInstanse.get(`/Customer/Categories`);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['Categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5
  })

  if (isError) console.log(error);
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
        {t('Categories')}
        <Divider sx={{ width: '150px', backgroundColor: '#AE75DA', mt: '4px', height: '2px' }}></Divider>
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        {data.map((category) => (
          <Box
            key={category.id}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: '50px',
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
