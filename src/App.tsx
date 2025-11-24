import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import ProductList from "./components/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetailPage from "./pages/ProductDetailPage";  
import "./App.css";

const App = () => {
  return (
    <ProductProvider>
      <div style={{ padding: "20px" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1>Quản lý sản phẩm</h1>
          <nav>
            <Link to="/" style={{ marginRight: "12px" }}>
              Trang chủ
            </Link>
            <Link to="/add">Thêm sản phẩm</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </main>
      </div>
    </ProductProvider>
  );
};

export default App