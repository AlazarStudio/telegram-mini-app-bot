import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    Avatar,
} from "@mui/material";

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (tg) {
            tg.ready();
            const userData = tg.initDataUnsafe?.user;
            setUser(userData);
        } else {
            alert("Приложение должно быть запущено в Telegram WebApp");
        }
    }, []);

    if (!user) {
        return (
            <Box sx={{ p: 2, maxWidth: 600, mx: "auto", textAlign: "center" }}>
                <Typography variant="h6">Загрузка данных пользователя...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
                Профиль
            </Typography>
            <Paper sx={{ p: 2, borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", textAlign: "center" }}>
                {user.photo_url ? (
                    <Avatar
                        src={user.photo_url}
                        alt={user.first_name}
                        sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                    />
                ) : (
                    <Avatar
                        sx={{ width: 100, height: 100, mx: "auto", mb: 2, backgroundColor: "#81212D" }}
                    >
                        {user.first_name[0]}
                    </Avatar>
                )}
                <Typography variant="body1" gutterBottom>
                    <strong>Имя пользователя:</strong> {user.first_name} {user.last_name || ""}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Юзернейм:</strong> {user.username ? `@${user.username}` : "Не указан"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>ID:</strong> {user.id}
                </Typography>
            </Paper>
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#81212D",
                        color: "#fff",
                        "&:hover": { backgroundColor: "#a62a3d" },
                        px: 4,
                        py: 1.5,
                    }}
                    onClick={() => alert("Профиль обновлен")}
                >
                    Обновить данные
                </Button>
            </Box>
        </Box>
    );
};

export default ProfilePage;