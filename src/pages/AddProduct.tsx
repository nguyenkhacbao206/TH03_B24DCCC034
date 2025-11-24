import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { Product } from "../types/Product";
import ProductForm from "../components/ProductForm";

const AddProduct: React.FC = () => {
  const { state, dispatch } = useProducts();
  const navigate = useNavigate();

  const handleAdd = (data: Omit<Product, "id">) => {
    const newId =
      state.products.length > 0
        ? Math.max(...state.products.map((p) => p.id)) + 1
        : 1;
    const newProduct: Product = { id: newId, ...data };
    dispatch({ type: "ADD", payload: newProduct });
    navigate("/");
  };

  return (
    <div>
      <h2>Thêm sản phẩm mới</h2>
      <ProductForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddProduct;
