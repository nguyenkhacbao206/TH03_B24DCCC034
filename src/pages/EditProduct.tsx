import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { Product } from "../types/Product";
import ProductForm from "../components/ProductForm";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useProducts();
  const navigate = useNavigate();

  const product = state.products.find((p) => p.id === Number(id));

  if (!product) {
    return <p> Không tìm thấy sản phẩm có ID = {id}</p>;
  }

  const handleUpdate = (updated: Omit<Product, "id">) => {
    const newProduct: Product = { ...product, ...updated };
    dispatch({ type: "UPDATE", payload: newProduct });
    navigate("/");
  };

  return (
    <div>
      <h2>Chỉnh sửa sản phẩm</h2>
      <ProductForm initial={product} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditProduct;
