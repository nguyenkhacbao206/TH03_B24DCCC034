import React, { useMemo, useState } from "react";
import { useProducts } from "../context/ProductContext";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const PAGE_SIZE = 6;

const ProductList: React.FC = () => {
  const { state, dispatch } = useProducts();
  const products = state.products;

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let arr = [...products];
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter((p) => p.ten.toLowerCase().includes(q));
    }
    if (category !== "Tất cả") arr = arr.filter((p) => p.danhMuc === category);
    const minVal = min ? Number(min) : -Infinity;
    const maxVal = max ? Number(max) : Infinity;
    arr = arr.filter((p) => p.gia >= minVal && p.gia <= maxVal);
    return arr;
  }, [products, query, category, min, max]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      dispatch({ type: "DELETE", payload: id });
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <SearchBar query={query} setQuery={setQuery} />
          <FilterBar
            category={category}
            setCategory={setCategory}
            min={min}
            max={max}
            setMin={setMin}
            setMax={setMax}
          />
        </div>
        <div>
          Tổng: {filtered.length} | Trang {current}/{totalPages}
        </div>
      </div>

      <div className="grid">
        {pageItems.map((p) => (
          <div key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <Pagination current={current} totalPages={totalPages} onPage={setPage} />
    </div>
  );
};

export default ProductList;
