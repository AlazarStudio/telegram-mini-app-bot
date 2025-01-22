import React from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products"; // Список товаров

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <h2>Товар не найден</h2>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <img
                src={product.image}
                alt={product.name}
                style={{ width: "300px", borderRadius: "8px" }}
            />
            <p>{product.description}</p>
            <p>Цена: {product.price} руб.</p>
        </div>
    );
};

export default ProductDetail;
