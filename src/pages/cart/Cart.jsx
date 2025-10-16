import { CardContent } from '@mui/material';
import { Button, Card, CardActions, CardMedia, Container, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add'
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Slide, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function Cart() {

  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const fetchProducts = async () => {
    const response = await AxiosUserInstanse.get(`/Customer/Carts`);
    return response;
  };
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchProducts,
    staleTime: 1000

  })


  const removeItem = async (productId) => {
    try {
      const response = await AxiosUserInstanse.delete(`/Customer/Carts/${productId}`);
      if (response.status == 200) {
        toast.success(t('product_deleted_successfully'), {
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
      console.log(error);
    }
  }

  const clearCart = async () => {
    try {
      const response = await AxiosUserInstanse.delete(`/Customer/Carts/clear`);
      if (response.status == 200) {
        toast.success(t('cart_cleared_successfully'), {
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
      console.log(error);
    }
  }

  const incItem = async (productId) => {
    try {
      const response = await AxiosUserInstanse.post(`/Customer/Carts/increment/${productId}`, {});
      if (response.status == 200) {
        queryClient.invalidateQueries(['cartItems']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const decItem = async (productId) => {
    try {
      const response = await AxiosUserInstanse.post(`/Customer/Carts/decrement/${productId}`, {});
      if (response.status == 200) {
        queryClient.invalidateQueries(['cartItems']);
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={60} thickness={5} color="primary" />
      </Box>
    );
  }

  if (data.data.items.length === 0)
    return (
      <Box p={20}>
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <ShoppingCartOutlinedIcon sx={{ fontSize: 60 }} color='action' />
          <Typography component={'h2'} variant='h5' color='textSecondary'>{t('empty_cart')}</Typography>
          <Typography component={'h3'} variant='h4' sx={{ color: 'text.secondary', opacity: 0.6, fontSize: '19px' }}>{t('fix_empty_cart')}</Typography>
          <Button variant='contained' sx={{ backgroundColor: '#4fc4ca', color: '#312D5F' }} component={Link} to='/'>{t('shop_now')}</Button>

        </Container>
      </Box>
    );
  return (
    <Box py={8}>
      <Container>
        <Typography component={'h2'} variant='h5' sx={{ fontWeight: 700, pb: 2 }}>{t('Cart')}</Typography>
        {data.data.items.map((product) => (

          <Card key={product.productId} sx={(theme) => ({
            p: 2,
            boxShadow: 'none',
            borderBottom: '1px solid #d4d0d0ff',
            borderBottomColor : theme.palette.mode === "dark" ? "#000000" : "#d4d0d0ff",
            display: 'flex',
            alignItems: 'flex-start',
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            },
          })} >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography component={'h2'} variant='h6' sx={(theme) => ({ fontSize: '18px', color: theme.palette.mode === "dark" ? "#fffffff" : "#4fc4ca", fontWeight: 800 })}>{product.productName}</Typography>
              <Typography component={'h2'} variant='h6' sx={{ fontSize: '16px' }} >{t('Price')} : {product.price}$</Typography>
              <Typography component={'h2'} variant='h' sx={{ fontSize: '20px' }}>{t('total_price')} : {product.totalPrice}$</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: "flex-start", gap: 2 }}>
              <Button sx={{ gap: 1 }} startIcon={<DeleteIcon />} color='error' onClick={() => { removeItem(product.productId) }}>
                {t('delete')}
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, border: '1px solid rgba(219, 219, 219, 0.87)', borderRadius: 3 }}>
                <Button sx={{ color: '#4fc4ca', minWidth: 'auto' }} onClick={product.count == 1 ? () => { removeItem(product.productId) } : () => { decItem(product.productId) }}><RemoveIcon sx={{ fontWeight: 900 }} /></Button>
                <Typography>{product.count}</Typography>
                <Button sx={{ color: '#4fc4ca', minWidth: 'auto' }} onClick={() => { incItem(product.productId) }} ><AddIcon /></Button>
              </Box>
            </CardActions>
          </Card>

        ))}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', py: 4, gap: 2 }}>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }} >
            <Typography component={'h2'} variant='h' sx={{ fontSize: '20px' }}>{t('cart_total')} : {data.data.cartTotal}$</Typography>
            <Button variant='contained' sx={(theme) => ({ backgroundColor: theme.palette.mode === "dark" ? "#1B9CA4" : "#4fc4ca", color: '#312D5F', width: '100%' })} component={Link} to='/checkout'>{t('checkout')}</Button>
          </Box>
          <Button variant='outlined' color='error' onClick={() => { clearCart() }}>
            {t('clear_cart')}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
