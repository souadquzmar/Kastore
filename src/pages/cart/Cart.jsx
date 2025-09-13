import { CardContent } from '@mui/material';
import { Button, Card, CardActions, CardMedia, Container, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add'
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { useQuery } from '@tanstack/react-query';

export default function Cart() {


  const fetchProducts = async () => {
      const response = await AxiosUserInstanse.get(`/Carts`);
      return response;
  };
  const {data,isLoading,isError,error} = useQuery({
    queryKey:['Products'],
    queryFn:fetchProducts,
    staleTime:1000*60*5
  })
  

  const removeItem = async (productId) => {
    try {
      const response = await AxiosUserInstanse.delete(`/Carts/${productId}`);
      if(response.status == 200){
      getProducts();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const clearCart = async () => {
    try {
      const response = await AxiosUserInstanse.delete(`/Carts/clear`);
      if (response.status == 200) {
        getProducts();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const incItem = async(productId)=>{
    try{
      const response = await AxiosUserInstanse.post(`/Carts/increment/${productId}`,{});
      if (response.status == 200) {
        getProducts();
      }
    } catch(error){
      console.log(error);
    }
  }

  const decItem = async(productId)=>{
    try{
      const response = await AxiosUserInstanse.post(`/Carts/decrement/${productId}`,{});
      if (response.status == 200) {
        getProducts();
      }
    } catch(error){
      console.log(error);
    }
  }
  
  if(isError) console.log(error);

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

  return (
    <Box sx={{ height: '100vh' }} py={8}>
      <Container>
        <Typography component={'h2'} variant='h5' sx={{ fontWeight: 700, pb: 2 }}>Cart</Typography>
        {data.data.items.map((product) => (

          <Card sx={{
            p: 2,
            boxShadow: 'none',
            borderBottom: '1px solid #d4d0d0ff',
            display: 'flex',
            alignItems: 'flex-start',
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            },
          }} >
            <CardContent sx={{flexGrow:1}}>
              <Typography component={'h2'} variant='h6' sx={{ fontSize: '18px', color: '#4fc4ca', fontWeight: 800 }}>{product.productName}</Typography>
              <Typography component={'h2'} variant='h6' sx={{ fontSize: '16px'}} color='textSecondary'>Price : {product.price}$</Typography>
              <Typography component={'h2'} variant='h' sx={{ fontSize: '20px'}}>Total Price : {product.totalPrice}$</Typography>
            </CardContent>
            <CardActions sx={{display:'flex',flexDirection:'column',justifyContent:"flex-start",gap:2}}>
              <Button startIcon={<DeleteIcon />} color='error' onClick={() => { removeItem(product.productId) }}>
                Delete
              </Button>
              <Box sx={{display:'flex',alignItems:'center',gap:1,border:'1px solid rgba(219, 219, 219, 0.87)',borderRadius:3}}>
                <Button sx={{color:'#4fc4ca',minWidth:'auto'}} onClick={product.count == 1? () => { removeItem(product.productId) }:()=>{decItem(product.productId)}}><RemoveIcon sx={{fontWeight:900}}/></Button>
                <Typography>{product.count}</Typography>
                <Button sx={{color:'#4fc4ca',minWidth:'auto'}} onClick={()=>{incItem(product.productId)}} ><AddIcon /></Button>
              </Box>
            </CardActions>
          </Card>

        ))}
        <Box sx={{ display: 'flex', alignItems: 'center', py:4}}>
          <Typography component={'h2'} variant='h' sx={{ fontSize: '20px', flexGrow: 1 }}>Cart Total : {data.data.cartTotal}$</Typography>
          <Button variant='outlined' color='error' onClick={() => { clearCart() }}>
            Clear Cart
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
