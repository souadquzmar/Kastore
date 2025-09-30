import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';
import { Avatar, CircularProgress, Typography } from '@mui/material';
import { deepPurple, pink } from '@mui/material/colors';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LogoutIcon from '@mui/icons-material/Logout';
import { Slide, toast } from 'react-toastify';

export default function Profile() {

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const fetchProfile = async () => {
    const response = await AxiosUserInstanse.get(`Users/Profile`);
    return response;
  }

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchProfile,
    staleTime: 1000 * 5 * 60
  })
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    toast.success(t('logged_out_successfully'), {
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
    navigate("/login");
  };
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

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: deepPurple[500], width: 50, height: 50 }}> {user.data.fullName[0].toUpperCase()}{user.data.fullName.split(' ')[1][0].toUpperCase()} </Avatar>
        <Typography>{user.data.fullName}</Typography>
      </Box>
      <Divider sx={{ borderBottomWidth: 2, pt: 3 }} />
      <List>

        <ListItem  >
          <ListItemButton component={Link} to='/profile' >
            <ListItemIcon sx={{ color: '#16123F' }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={t(`my_profile`)} sx={{ color: '#16123F' }} />
          </ListItemButton>
        </ListItem>

        <ListItem  >
          <ListItemButton component={Link} to='orders'>
            <ListItemIcon sx={{ color: '#16123F' }}>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary={t(`my_orders`)} sx={{ color: '#16123F' }} />
          </ListItemButton>
        </ListItem>

        <ListItem  >
          <ListItemButton>
            <ListItemIcon sx={{ color: '#16123F' }}>
              <SettingsIcon />
            </ListItemIcon >
            <ListItemText primary={t(`settings`)} sx={{ color: '#16123F' }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ borderBottomWidth: 2 }} />
      <List>

        <ListItem  >
          <ListItemButton onClick={() => { handleLogout(); }}>
            <ListItemIcon sx={{ color: '#16123F' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t(`logout`)} sx={{ color: '#16123F' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      <Box sx={{ display: 'flex' ,p:2}}>
        <Drawer
          variant="permanent"
          open
          sx={{
            '& .MuiDrawer-paper': {
              position: 'relative',
              backgroundColor: '#F2F2F2',
              width: 280,
              padding: 2,
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              margin: 2,
              height: '70vh',
            },
          }}
        >
          {DrawerList}
        </Drawer>


      </Box>
      <Box sx={{flexGrow:1}}>
        <Outlet />
      </Box>
    </Box>
  );
}
