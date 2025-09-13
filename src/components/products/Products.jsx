import { Button, Card, CardActions, CardContent, Link } from "@mui/material";
import {
  Box,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AxiosInstanse from "../../api/AxiosInstanse";
import { useQuery } from "@tanstack/react-query";

export default function Products() {


  const fetchProducts = async () => {
      const response = await AxiosInstanse.get(`/Products`);
      return response;
  };

  const {data,isLoading,isError,error} = useQuery({
    queryKey:['products'],
    queryFn:fetchProducts,
    staleTime:1000*60*5
  })

  if(isError) console.log(error);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress size={60} thickness={5} color="primary" />
      </Box>
    );
  }
  return (
    <Box pb={8}>
      <Typography
        component={"h2"}
        variant="h5"
        pb={3}
        pt={6}
        sx={{ fontWeight: 800 }}
      >
        Products
        <Divider
          sx={{
            width: "130px",
            backgroundColor: "#4fc4ca",
            mt: "4px",
            height: "2px",
          }}
        ></Divider>
      </Typography>

      <Grid container spacing={4}>
        {data.data.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                border:0,
                width: 240,
                height: 480,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                },
                padding: 0,
              }}
            >
              <CardMedia
                component="img"
                alt="product"
                image={product.mainImageUrl}
                sx={{
                  width: "100%",
                  borderRadius:2,
                  objectFit: "cover", 
                  
                }}
              />
              <CardContent sx={{px:2,pb:0,flexGrow:1,mb:0}}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "18px", fontWeight: 800,pb:0 }}
                >
                  {product.name.split(" ").slice(0, 4).join(" ")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, fontSize: "20px", color: "#4fc4ca",mb:0 }}
                >
                  {product.price}$
                </Typography>
              </CardContent>
              <CardActions sx={{px:2,pt:0,mt:0,pb:3}}>
                <Link
                  variant="contained"
                  component={RouterLink}
                  to={`/productDetails/${product.id}`}
                  sx={{
                    border: "2px solid #4fc4ca",
                    backgroundColor: "#4fc4ca",
                    color: "#16123F",
                    textDecoration: "none",
                    padding: "8px 24px",
                    borderRadius: "5px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#4fc4ca",
                      color: "#4fc4ca",
                      textDecoration: "none",
                      backgroundColor: "#fff",
                      transform: "translateY(-3px)",
                      boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  Details
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
