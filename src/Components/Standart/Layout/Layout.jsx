import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  // Определяем активный пункт меню на основе текущего маршрута
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setValue(0);
        break;
      case "/products":
        setValue(1);
        break;
      case "/cart":
        setValue(2);
        break;
      case "/profile":
        setValue(3);
        break;
      default:
        setValue(0);
        break;
    }
  }, [location.pathname]);

  const handleNavigation = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/products");
        break;
      case 2:
        navigate("/cart");
        break;
      case 3:
        navigate("/profile");
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      <Outlet />
      <footer>
        <BottomNavigation
          value={value}
          onChange={handleNavigation}
          showLabels
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            boxShadow: "0 -1px 5px rgba(0,0,0,0.1)",
          }}
        >
          <BottomNavigationAction label="Главная" icon={<HomeIcon />} />
          <BottomNavigationAction label="Каталог" icon={<CategoryIcon />} />
          <BottomNavigationAction label="Корзина" icon={<ShoppingCartIcon />} />
          <BottomNavigationAction label="Профиль" icon={<PersonIcon />} />
        </BottomNavigation>
      </footer>
    </div>
  );
};

export default Layout;
