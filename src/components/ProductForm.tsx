import React, { useState } from "react";
import { Product } from "../types/Product";

type ProductFormData = Omit<Product, "id">;

interface ProductFormProps {
  initial?: Product;
  onSubmit: (data: ProductFormData) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initial, onSubmit }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    ten: initial?.ten || "",
    danhMuc: initial?.danhMuc || "",
    gia: initial?.gia || 0,
    soLuong: initial?.soLuong || 0,
    moTa: initial?.moTa || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "gia" || name === "soLuong" ? Number(value) : value,
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.ten || formData.ten.trim().length < 3)
      newErrors.ten = "Tên sản phẩm phải có ít nhất 3 ký tự";
    if (!formData.danhMuc)
      newErrors.danhMuc = "Vui lòng chọn danh mục";
    if (formData.gia <= 0)
      newErrors.gia = "Giá phải là số dương";
    if (formData.soLuong <= 0 || !Number.isInteger(formData.soLuong))
      newErrors.soLuong = "Số lượng phải là số nguyên dương";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tên sản phẩm:</label>
        <input name="ten" value={formData.ten} onChange={handleChange} />
        {errors.ten && <p style={{ color: "red" }}>{errors.ten}</p>}
      </div>

      <div>
        <label>Danh mục:</label>
        <select name="danhMuc" value={formData.danhMuc} onChange={handleChange}>
          <option value="">-- Chọn danh mục --</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Quần áo">Quần áo</option>
          <option value="Đồ ăn">Đồ ăn</option>
          <option value="Sách">Sách</option>
          <option value="Khác">Khác</option>
        </select>
        {errors.danhMuc && <p style={{ color: "red" }}>{errors.danhMuc}</p>}
      </div>

      <div>
        <label>Giá:</label>
        <input type="number" name="gia" value={formData.gia} onChange={handleChange} />
        {errors.gia && <p style={{ color: "red" }}>{errors.gia}</p>}
      </div>

      <div>
        <label>Số lượng:</label>
        <input type="number" name="soLuong" value={formData.soLuong} onChange={handleChange} />
        {errors.soLuong && <p style={{ color: "red" }}>{errors.soLuong}</p>}
      </div>

      <div>
        <label>Mô tả:</label>
        <textarea name="moTa" value={formData.moTa} onChange={handleChange} />
      </div>

      <button type="submit">Lưu</button>
    </form>
  );
};

export default ProductForm;
