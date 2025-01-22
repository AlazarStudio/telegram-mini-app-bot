import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    CardMedia,
    TextField,
    IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import products from "../../data/products"; // Данные о товарах

const Main_Page = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // Проверяем, есть ли товар в корзине
    const isInCart = (productId) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart.some((item) => item.id === productId);
    };

    // Фильтруем товары по поисковому запросу
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    return (
        <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
            {/* Поиск */}
            <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Искать товары..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <IconButton edge="start" disabled>
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                    sx={{ borderRadius: "12px", backgroundColor: "#f9f9f9" }}
                />
            </Box>

            {/* Список всех товаров */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
                    Товары
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={6} key={product.id}>
                            <Card
                                sx={{
                                    p: 2,
                                    borderRadius: "12px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={product.image}
                                    alt={product.name}
                                />
                                <CardContent sx={{ padding: "10px 0" }}>
                                    <Typography variant="h6" gutterBottom>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Цена: {new Intl.NumberFormat('ru-RU').format(product.price)} руб.
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ padding: "10px 0 0 0" }}>
                                    <Button
                                        component={Link}
                                        to={`/products/${product.id}`}
                                        size="small"
                                        variant="contained"
                                        sx={{ backgroundColor: "#81212D", "&:hover": { backgroundColor: "#a62a3d" } }}
                                    >
                                        Подробнее
                                    </Button>
                                    {isInCart(product.id) ? (
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            disabled
                                            sx={{ borderColor: "#81212D", color: "#81212D" }}
                                        >
                                            Уже добавлен
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => addToCart(product)}
                                            size="small"
                                            variant="outlined"
                                            sx={{ borderColor: "#81212D", color: "#81212D", "&:hover": { borderColor: "#a62a3d", color: "#a62a3d" } }}
                                        >
                                            В корзину
                                        </Button>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Main_Page;
