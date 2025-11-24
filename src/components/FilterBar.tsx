import React from "react";

interface Props {
  category: string;
  setCategory: (s: string) => void;
  min: string;
  max: string;
  setMin: (s: string) => void;
  setMax: (s: string) => void;
}

const FilterBar: React.FC<Props> = ({ category, setCategory, min, max, setMin, setMax }) => {
  const categories = ["Tất cả", "Điện tử", "Quần áo", "Đồ ăn", "Sách", "Khác"];
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input placeholder="Min giá" value={min} onChange={(e) => setMin(e.target.value)} style={{ width: 100 }} />
      <input placeholder="Max giá" value={max} onChange={(e) => setMax(e.target.value)} style={{ width: 100 }} />
    </div>
  );
};

export default FilterBar;
