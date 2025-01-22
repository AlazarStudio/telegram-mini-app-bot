import React from "react";
import { Link } from "react-router-dom";
import products from "../../data/products"; // Список товаров

const ProductsPage = () => {
    return (
        <div>
            <h1>Каталог электроники</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {products.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "200px",
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: "100%", borderRadius: "8px" }}
                        />
                        <h2>{product.name}</h2>
                        <p>Цена: {product.price} руб.</p>
                        <Link to={`/products/${product.id}`}>Подробнее</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
