import React, { useState } from "react";
import { Product } from "../types/Product";

type ProductFormData = Omit<Product, "id">;

interface ProductFormProps {
  initial?: Product;
  onSubmit: (data: ProductFormData) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initial, onSubmit }) => {
  // Lưu input số dưới dạng string để input có thể trống
  const [formData, setFormData] = useState({
    ten: initial?.ten || "",
    danhMuc: initial?.danhMuc || "",
    gia: initial?.gia?.toString() || "",
    soLuong: initial?.soLuong?.toString() || "",
    moTa: initial?.moTa || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const numericGia = Number(formData.gia);
    const numericSoLuong = Number(formData.soLuong);

    if (!formData.ten || formData.ten.trim().length < 3)
      newErrors.ten = "Tên sản phẩm phải có ít nhất 3 ký tự";
    if (!formData.danhMuc) newErrors.danhMuc = "Vui lòng chọn danh mục";
    if (!formData.gia || isNaN(numericGia) || numericGia <= 0)
      newErrors.gia = "Giá phải là số dương";
    if (
      !formData.soLuong ||
      isNaN(numericSoLuong) ||
      numericSoLuong <= 0 ||
      !Number.isInteger(numericSoLuong)
    )
      newErrors.soLuong = "Số lượng phải là số nguyên dương";

    if (!formData.moTa || formData.moTa.trim().length < 10) {
      newErrors.moTa = "vui lòng nhập đủ từ 10 ký tự trở lên"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ten: formData.ten,
      danhMuc: formData.danhMuc,
      gia: Number(formData.gia),
      soLuong: Number(formData.soLuong),
      moTa: formData.moTa,
    });
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
        <input
          type="number"
          name="gia"
          value={formData.gia}
          onChange={handleChange}
          placeholder="Nhập giá"
        />
        {errors.gia && <p style={{ color: "red" }}>{errors.gia}</p>}
      </div>

      <div>
        <label>Số lượng:</label>
        <input
          type="number"
          name="soLuong"
          value={formData.soLuong}
          onChange={handleChange}
          placeholder="Nhập số lượng"
        />
        {errors.soLuong && <p style={{ color: "red" }}>{errors.soLuong}</p>}
      </div>

      <div>
        <label>Mô tả:</label>
        <textarea name="moTa" value={formData.moTa} onChange={handleChange} />
        {errors.moTa && <p style={{ color: "red" }}>{errors.moTa}</p>}
      </div>

      <button type="submit">Lưu</button>
    </form>
  );
};

export default ProductForm;
