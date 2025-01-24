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

    const sendOrderToBot = async () => {
        const tg = window.Telegram.WebApp;
        const user = tg.initDataUnsafe.user;

        const orderDetails = cart.map(
            (item) => `${item.name} x${item.quantity} = ${item.quantity * item.price} руб.`
        ).join("\n");
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const message = `🛒 *Новый заказ*\n👤 Пользователь: [${user.first_name} ${user.last_name || ""}](tg://user?id=${user.id})\n📦 Товары:\n${orderDetails}\n💰 *Общая сумма*: ${total} руб.`;

        const BOT_TOKEN = "7746793707:AAE4NQYuJK3fyJp-9bl6FA8uyj4qdGVIG7w";
        const CHAT_ID = "992109845"; // Замените на ID чата или группы

        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: "Markdown",
                }),
            });
            alert("Заказ успешно отправлен!");
            // Очистить корзину после отправки заказа
            localStorage.removeItem("cart");
            setCart([]);
        } catch (error) {
            console.error("Ошибка при отправке заказа:", error);
            alert("Ошибка при отправке заказа. Попробуйте еще раз.");
        }
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
                                            Цена: {new Intl.NumberFormat('ru-RU').format(item.price)} руб.
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
                            onClick={sendOrderToBot}
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
