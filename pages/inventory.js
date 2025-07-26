// pages/inventory.js
import { useEffect, useState } from "react";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stockSummary, setStockSummary] = useState([]);

  useEffect(() => {
    const purchaseData = JSON.parse(localStorage.getItem("products") || "[]");
    const orderData = JSON.parse(localStorage.getItem("orders") || "[]");

    const summary = purchaseData.map((p) => {
      const soldQty = orderData
        .flatMap((o) => o.items)
        .filter((i) => i.barcode === p.barcode)
        .reduce((sum, i) => sum + (i.qty || 1), 0);
      return {
        barcode: p.barcode,
        name: p.name,
        category: p.category,
        sub: p.sub,
        store: p.store || "N/A",
        inQty: p.qty,
        outQty: soldQty,
        stock: p.qty - soldQty,
      };
    });

    setProducts(purchaseData);
    setOrders(orderData);
    setStockSummary(summary);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>庫存管理</h2>
      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>分類</th>
            <th>子分類</th>
            <th>商品名稱</th>
            <th>條碼</th>
            <th>進貨量</th>
            <th>銷售量</th>
            <th>庫存量</th>
          </tr>
        </thead>
        <tbody>
          {stockSummary.map((s, i) => (
            <tr key={i}>
              <td>{s.category}</td>
              <td>{s.sub}</td>
              <td>{s.name}</td>
              <td>{s.barcode}</td>
              <td>{s.inQty}</td>
              <td>{s.outQty}</td>
              <td>{s.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
