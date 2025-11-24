import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/Product";
import { useProducts } from "../context/ProductContext";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const { dispatch } = useProducts();

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      dispatch({ type: "DELETE", payload: product.id });
    }
  };

  return (
    <div className="product-card">
      <h3>{product.ten}</h3>
      <p>Danh mục: {product.danhMuc}</p>
      <p>Giá: {product.gia.toLocaleString()}đ</p>
      <button onClick={() => navigate(`/products/${product.id}`)}>Chi tiết</button>
      <button onClick={() => navigate(`/edit/${product.id}`)}>Sửa</button>
      <button onClick={handleDelete}>Xóa</button>
    </div>
  );
};

export default ProductCard;
