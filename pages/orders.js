// pages/orders.js
import { useState, useEffect } from "react";

export default function Orders() {
  const [barcode, setBarcode] = useState("");
  const [productList, setProductList] = useState([]);
  const [order, setOrder] = useState([]);
  const [member, setMember] = useState({ name: "", id: "" });
  const [store, setStore] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shelves") || "[]");
    setProductList(data);
  }, []);

  const addItem = () => {
    const found = productList.find(p => p.barcode === barcode);
    if (found) {
      setOrder([...order, { ...found, qty: 1 }]);
      setBarcode("");
    }
  };

  const submit = () => {
    const date = new Date();
    const id =
      date.toISOString().slice(0, 10).replace(/-/g, "") +
      String(Math.floor(Math.random() * 10000)).padStart(4, "0");

    const newOrder = { id, member, store, items: order };
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));

    alert("訂單已建立：" + id);
    setOrder([]);
    setMember({ name: "", id: "" });
    setStore("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>建立訂單</h2>
      <input
        placeholder="商品條碼"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <button onClick={addItem}>加入</button>
      <br />
      <input
        placeholder="會員名稱"
        value={member.name}
        onChange={(e) => setMember({ ...member, name: e.target.value })}
      />
      <input
        placeholder="會員編號"
        value={member.id}
        onChange={(e) => setMember({ ...member, id: e.target.value })}
      />
      <input
        placeholder="門市"
        value={store}
        onChange={(e) => setStore(e.target.value)}
      />
      <h3>訂單明細</h3>
      <ul>
        {order.map((o, i) => (
          <li key={i}>
            {o.name} x {o.qty}
          </li>
        ))}
      </ul>
      <button onClick={submit}>建立訂單</button>
    </div>
  );
}
