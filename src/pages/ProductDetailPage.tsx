import React from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "./ProductDetailPage.css";

const ProductDetailPage: React.FC = () => {
  const { state } = useProducts();
  const { id } = useParams();
  const p = state.products.find((x) => x.id === Number(id));
  if (!p) return <div>Sản phẩm không tồn tại. <Link to="/">Về trang chủ</Link></div>;
  return (
      <div className="product-detail-page">
          <h2>{p.ten}</h2>
          <p>Danh mục: {p.danhMuc}</p>
          <p className="price">Giá: {p.gia.toLocaleString()} đ</p>
          <p>Số lượng: {p.soLuong}</p>
          <p>Mô tả: {p.moTa}</p>

          <Link to="/" className="back-link">Quay lại</Link>
      </div>

  );
};

export default ProductDetailPage;
