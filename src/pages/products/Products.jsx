import React, { useState } from 'react'
import AxiosInstanse from '../../api/AxiosInstanse'
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography, Link, Divider, Pagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SortIcon from '@mui/icons-material/Sort';
export default function Products() {

    const [sort, setSort] = useState('');
    const navigate = useNavigate();
    const { page } = useParams();
    const [Page, setPage] = useState(page);
    const { t } = useTranslation();
    const fetchProducts = async ({ queryKey }) => {
        const [, currPage, currSort] = queryKey;
        const skip = (currPage - 1) * 10;
        const [sortBy, sortOrder] = currSort.split(' ');
        const response = await AxiosInstanse.get(`/Customer/products?limit=10&skip=${skip}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
        return response;
    }

    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['products', Page, sort],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5
    })
    const handleChange = (event) => {
        setSort(event.target.value);
    };
    if (isError) console.log(error);

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
    const numberOfPages = Math.ceil(data.data.totalCount / 10);

    return (
        <Box pb={8}>
            <Typography
                component={"h2"}
                variant="h5"
                pb={3}
                pt={6}
                sx={{ fontWeight: 800 }}
            >
                {t('Products')}
                <Divider
                    sx={{
                        width: "130px",
                        backgroundColor: "#4fc4ca",
                        mt: "4px",
                        height: "2px",
                    }}
                ></Divider>
            </Typography>
            <Box pb={5} >
                <FormControl variant="standard" sx={{ minWidth: 130 }}>
                    <InputLabel id="sortSelection" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><SortIcon /> {t(`sortby`)}</InputLabel>
                    <Select
                        labelId="sortSelection"
                        id="sort"
                        value={sort}
                        label="sort"
                        onChange={handleChange}
                    >
                        <MenuItem value={'price asc'}>{t(`price_asc`)}</MenuItem>
                        <MenuItem value={'price desc'}>{t(`price_desc`)}</MenuItem>
                        <MenuItem value={'name asc'}>{t(`name_asc`)}</MenuItem>
                        <MenuItem value={'name desc'}>{t(`name_desc`)}</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Grid container spacing={4} pb={4}>
                {data.data.data.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            sx={{
                                border: 0,
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
                                    borderRadius: 2,
                                    objectFit: "cover",

                                }}
                            />
                            <CardContent sx={{ px: 2, pb: 0, flexGrow: 1, mb: 0 }}>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                    sx={{ fontSize: "18px", fontWeight: 800, pb: 0 }}
                                >
                                    {product.name.split(" ").slice(0, 4).join(" ")}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={(theme) => ({ fontWeight: 700, fontSize: "20px", color: theme.palette.mode === "dark" ? "#ffffff" : "#4fc4ca", mb: 0 })}
                                >
                                    {product.price}$
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ px: 2, pt: 0, mt: 0, pb: 3 }}>
                                <Link
                                    variant="contained"
                                    component={RouterLink}
                                    to={`/productDetails/${product.id}`}
                                    sx={(theme) => ({
                                        border: `2px solid ${theme.palette.mode === "dark" ? "#1B9CA4" : "#4fc4ca"}`,
                                        backgroundColor: theme.palette.mode === "dark" ? "#1B9CA4" : "#4fc4ca",
                                        color: theme.palette.mode === "dark" ? "#0E0E0E" : "#16123F",
                                        textDecoration: "none",
                                        padding: "8px 24px",
                                        borderRadius: "5px",
                                        fontWeight: 700,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transition: "all 0.3s ease",

                                        "&:hover": {
                                            borderColor: theme.palette.mode === "dark" ? "#1B9CA4" : "#4fc4ca",
                                            color: theme.palette.mode === "dark" ? "#1B9CA4" : "#4fc4ca",
                                            textDecoration: "none",
                                            backgroundColor:
                                                theme.palette.mode === "dark" ? "#151515" : "#fff",
                                            transform: "translateY(-3px)",
                                            boxShadow:
                                                theme.palette.mode === "dark"
                                                    ? "0 6px 14px rgba(0,0,0,0.5)"
                                                    : "0 6px 14px rgba(0,0,0,0.12)",
                                        },
                                    })}

                                >
                                    {t('Details')}
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={numberOfPages}
                page={Page}
                onChange={(e, nextPage) => { setPage(nextPage); navigate(`/products/${nextPage}`); }}
                shape="rounded"
            />
        </Box>
    );
}

