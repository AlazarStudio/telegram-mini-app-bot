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
    TextField,
    IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import TvIcon from "@mui/icons-material/Tv";
import products from "../../data/products"; // Данные о товарах

const Main_Page = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // Фильтруем товары по поисковому запросу
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

            {/* Популярные категории */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Популярные категории
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={4} md={3}>
                        <Button
                            component={Link}
                            to="/products?category=laptops"
                            sx={{
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                color: "#333",
                                p: 2,
                                backgroundColor: "#f5f5f5",
                                borderRadius: "12px",
                                "&:hover": { backgroundColor: "#e0e0e0" },
                            }}
                        >
                            <LaptopMacIcon sx={{ fontSize: 40, mb: 1 }} />
                            <Typography variant="body2">Ноутбуки</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <Button
                            component={Link}
                            to="/products?category=smartphones"
                            sx={{
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                color: "#333",
                                p: 2,
                                backgroundColor: "#f5f5f5",
                                borderRadius: "12px",
                                "&:hover": { backgroundColor: "#e0e0e0" },
                            }}
                        >
                            <SmartphoneIcon sx={{ fontSize: 40, mb: 1 }} />
                            <Typography variant="body2">Смартфоны</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <Button
                            component={Link}
                            to="/products?category=tv"
                            sx={{
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                color: "#333",
                                p: 2,
                                backgroundColor: "#f5f5f5",
                                borderRadius: "12px",
                                "&:hover": { backgroundColor: "#e0e0e0" },
                            }}
                        >
                            <TvIcon sx={{ fontSize: 40, mb: 1 }} />
                            <Typography variant="body2">Телевизоры</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Список всех товаров */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h6" gutterBottom>
                    Все товары
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card
                                sx={{
                                    p: 2,
                                    borderRadius: "12px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Цена: {product.price} руб.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        component={Link}
                                        to={`/products/${product.id}`}
                                        size="small"
                                        variant="contained"
                                        sx={{ backgroundColor: "#81212D", "&:hover": { backgroundColor: "#a62a3d" } }}
                                    >
                                        Подробнее
                                    </Button>
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
