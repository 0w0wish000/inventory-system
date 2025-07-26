// pages/reports.js
import { useEffect, useState } from "react";

export default function Reports() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("orders") || "[]");
    const productData = JSON.parse(localStorage.getItem("products") || "[]");
    setOrders(orderData);
    setProducts(productData);
  }, []);

  const getSalesAmountReport = () => {
    const map = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const key = `${item.category}/${item.sub}/${order.store}`;
        map[key] = (map[key] || 0) + (item.qty || 1) * (item.price || 1);
      });
    });

    return Object.entries(map).map(([key, amount]) => {
      const [cat, sub, store] = key.split("/");
      return { category: cat, sub, store, amount };
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>報表：營業額</h2>
      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>分類</th>
            <th>子分類</th>
            <th>門市</th>
            <th>營業額</th>
          </tr>
        </thead>
        <tbody>
          {getSalesAmountReport().map((r, i) => (
            <tr key={i}>
              <td>{r.category}</td>
              <td>{r.sub}</td>
              <td>{r.store}</td>
              <td>{r.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
