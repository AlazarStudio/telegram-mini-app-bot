import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
} from "@mui/material";

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const updateQuantity = (productId, delta) => {
        const updatedCart = cart.map((item) => {
            if (item.id === productId) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeItem = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleCheckout = () => {
        alert("Заказ оформлен! Спасибо за покупку.");
        setCart([]);
        localStorage.removeItem("cart");
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
                Корзина
            </Typography>

            {cart.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                    Ваша корзина пуста.
                </Typography>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {cart.map((item) => (
                            <Grid item xs={12} key={item.id}>
                                <Card
                                    sx={{
                                        p: 2,
                                        borderRadius: "12px",
                                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                        width: "100%",
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Цена: {item.price} руб.
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Количество: {item.quantity}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Box>
                                            <Button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    borderColor: "#81212D",
                                                    color: "#81212D",
                                                    "&:hover": { borderColor: "#a62a3d", color: "#a62a3d" },
                                                }}
                                            >
                                                -
                                            </Button>
                                            <Button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    borderColor: "#81212D",
                                                    color: "#81212D",
                                                    "&:hover": { borderColor: "#a62a3d", color: "#a62a3d" },
                                                    ml: 1,
                                                }}
                                            >
                                                +
                                            </Button>
                                        </Box>
                                        <Button
                                            onClick={() => removeItem(item.id)}
                                            size="small"
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "#ff1744",
                                                "&:hover": { backgroundColor: "#d50000" },
                                            }}
                                        >
                                            Удалить
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ textAlign: "center", mt: 4 }}>
                        <Button
                            onClick={handleCheckout}
                            variant="contained"
                            sx={{
                                backgroundColor: "#81212D",
                                color: "#fff",
                                "&:hover": { backgroundColor: "#a62a3d" },
                                px: 4,
                                py: 1.5,
                            }}
                        >
                            Оформить заказ
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default CartPage;
