import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    Box,
    Typography,
    Grid,
    Button,
    Card,
    CardContent,
    CardActions,
    CardMedia,
} from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import TvIcon from "@mui/icons-material/Tv";
import products from "../../data/products"; // Данные о товарах

const categories = [
    { id: "laptops", name: "Ноутбуки", icon: <LaptopMacIcon sx={{ fontSize: 50 }} /> },
    { id: "smartphones", name: "Смартфоны", icon: <SmartphoneIcon sx={{ fontSize: 50 }} /> },
    { id: "tv", name: "Телевизоры", icon: <TvIcon sx={{ fontSize: 50 }} /> },
];

const CatalogPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCategory = searchParams.get("category");

    const isInCart = (productId) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart.some((item) => item.id === productId);
    };

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} добавлен в корзину!`);
    };

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : [];

    return (
        <Box sx={{ p: 2, maxWidth: 800, mx: "auto" }}>
            {/* Список категорий */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
                    Категории
                </Typography>
                <Grid container spacing={2} justifyContent="flex-start">
                    {categories.map((category) => (
                        <Grid item xs={4} key={category.id}>
                            <Box
                                onClick={() => setSearchParams({ category: category.id })}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    p: 3,
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    transition: "0.3s",
                                    "&:hover": { backgroundColor: "#e0e0e0" },
                                }}
                            >
                                {category.icon}
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    {category.name}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                {selectedCategory && (
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Button
                            onClick={() => setSearchParams({})}
                            variant="outlined"
                            sx={{ borderColor: "#81212D", color: "#81212D", "&:hover": { borderColor: "#a62a3d", color: "#a62a3d" } }}
                        >
                            Сбросить фильтр
                        </Button>
                    </Box>
                )}
            </Box>

            {/* Список товаров в категории */}
            {selectedCategory && (
                <Box sx={{ mb: 8 }}>
                    <Typography variant="h6" gutterBottom>
                        Товары в категории: {categories.find((c) => c.id === selectedCategory)?.name}
                    </Typography>
                    <Grid container spacing={2}>
                        {filteredProducts.map((product) => (
                            <Grid item sx={{ width: '50%', height: '400px' }} key={product.id}>
                                <Card
                                    sx={{
                                        p: 2,
                                        borderRadius: "10px",
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                        // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={product.image}
                                        alt={product.name}
                                        sx={{
                                            minHeight: '150px',
                                            maxHeight: '150px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                    <Box sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}>
                                        <CardContent sx={{ padding: "10px 0" }}>
                                            <Typography gutterBottom sx={{ fontSize: '14px' }}>
                                                {product.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {new Intl.NumberFormat('ru-RU').format(product.price)} руб.
                                            </Typography>
                                        </CardContent>

                                        <CardActions sx={{ padding: "10px 0 0 0", display: 'flex', flexDirection: 'column' }}>
                                            <Button
                                                component={Link}
                                                to={`/products/${product.id}`}
                                                size="small"
                                                variant="contained"
                                                sx={{ fontSize: '12px', width: '100%', marginBottom: '10px', backgroundColor: "#81212D", "&:hover": { backgroundColor: "#a62a3d" } }}
                                            >
                                                Подробнее
                                            </Button>

                                            {isInCart(product.id) ? (
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    disabled
                                                    sx={{ fontSize: '12px', width: '100%', marginLeft: '0px !important', borderColor: "#81212D", color: "#81212D" }}
                                                >
                                                    Уже добавлен
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => addToCart(product)}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ fontSize: '12px', width: '100%', marginLeft: '0px !important', borderColor: "#81212D", color: "#81212D", "&:hover": { borderColor: "#a62a3d", color: "#a62a3d" } }}

                                                >
                                                    В корзину
                                                </Button>
                                            )}
                                        </CardActions>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default CatalogPage;
