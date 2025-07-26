import { useState, useEffect } from "react";

export default function Purchase() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: "", category: "", sub: "", barcode: "", qty: 0 });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(data);
  }, []);

  const generateBarcode = (cat, sub) => {
    const catCode = String(cat.charCodeAt(0)).padStart(3, "0");
    const subCode = String(sub.charCodeAt(0)).padStart(3, "0");
    const prodNum = String(products.length + 1).padStart(4, "0");
    return catCode + subCode + prodNum;
  };

  const saveProduct = () => {
    const newBarcode = generateBarcode(product.category, product.sub);
    const newProd = { ...product, barcode: newBarcode };
    const updated = [...products, newProd];
    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated);
    setProduct({ name: "", category: "", sub: "", barcode: "", qty: 0 });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>進貨</h2>
      <input placeholder="商品名稱" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} />
      <input placeholder="分類" value={product.category} onChange={e => setProduct({ ...product, category: e.target.value })} />
      <input placeholder="子分類" value={product.sub} onChange={e => setProduct({ ...product, sub: e.target.value })} />
      <input placeholder="數量" type="number" value={product.qty} onChange={e => setProduct({ ...product, qty: +e.target.value })} />
      <button onClick={saveProduct}>新增</button>
      <ul>
        {products.map((p, i) => (
          <li key={i}>{p.barcode} - {p.name} - {p.qty}</li>
        ))}
      </ul>
    </div>
  );
}