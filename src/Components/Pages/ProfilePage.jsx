import React from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Grid,
} from "@mui/material";

const ProfilePage = () => {
    const handleSave = () => {
        alert("Изменения сохранены!");
    };

    return (
        <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
                Профиль
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Имя пользователя"
                        defaultValue="Имя пользователя"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        defaultValue="example@email.com"
                        variant="outlined"
                        type="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Новый пароль"
                        type="password"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#81212D",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#a62a3d" },
                            px: 4,
                            py: 1.5,
                        }}
                        onClick={handleSave}
                    >
                        Сохранить изменения
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfilePage;
