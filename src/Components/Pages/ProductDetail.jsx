import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Grid,
    Container,
} from "@mui/material";
import products from "../../data/products"; // Список товаров

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
                Товар не найден
            </Typography>
        );
    }

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

    return (
        <Container maxWidth="md" sx={{ mt: 2 }}>
            <Button
                onClick={() => navigate(-1)}
                variant="outlined"
                sx={{ mb: 2, borderColor: "#81212D", color: "#81212D", "&:hover": { borderColor: "#a62a3d", color: "#a62a3d" } }}
            >
                Назад
            </Button>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Box
                        component="img"
                        src={product.image}
                        alt={product.name}
                        sx={{ width: "100%", borderRadius: "12px" }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        {product.description}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Цена: {new Intl.NumberFormat('ru-RU').format(product.price)} руб.
                    </Typography>
                    {isInCart(product.id) ? (
                        <Button
                            variant="outlined"
                            disabled
                            sx={{
                                borderColor: "#81212D",
                                color: "#81212D",
                                px: 4,
                                py: 1.5,
                            }}
                        >
                            Уже добавлен в корзину
                        </Button>
                    ) : (
                        <Button
                            onClick={() => addToCart(product)}
                            variant="contained"
                            sx={{
                                backgroundColor: "#81212D",
                                color: "#fff",
                                "&:hover": { backgroundColor: "#a62a3d" },
                                px: 4,
                                py: 1.5,
                            }}
                        >
                            Добавить в корзину
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetail;
