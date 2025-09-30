import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { Box, CircularProgress, Container, TextField, Typography } from '@mui/material';

export default function Info() {

    const queryClient = useQueryClient();

    const fetchProfile = async () =>{
        const response = await AxiosUserInstanse.get(`Users/Profile`);
        return response;
    }

    const {data:user,isLoading} = useQuery({
        queryKey:['user'],
        queryFn:fetchProfile,
        staleTime:1000 * 5 * 60
    })
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
    <Box py={4} mr={12}>
      <Container>
        <Typography component={'h1'} variant='h5' sx={{fontSize:'30px'}}>My Profile</Typography>
        <Box sx={{display:'flex',flexDirection:'column',py:4,gap:3}}>
          <TextField
          id="fullName"
          label="Full Name"
          defaultValue={user.data.fullName}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          id="userName"
          label="User Name"
          defaultValue={user.data.userName}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          id="email"
          label="Email"
          defaultValue={user.data.email}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          id="phone"
          label="Phone Number"
          defaultValue={user.data.phoneNumber}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        </Box>
      </Container>
    </Box>
  )
}
