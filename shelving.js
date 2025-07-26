// pages/shelving.js
import { useState, useEffect } from "react";

export default function Shelving() {
  const [products, setProducts] = useState([]);
  const [shelves, setShelves] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(data);
  }, []);

  const addToShelf = (p) => {
    const updated = [...shelves, { ...p, shelfQty: 1 }];
    setShelves(updated);
  };

  const submit = () => {
    localStorage.setItem("shelves", JSON.stringify(shelves));
    alert("已上架");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>上架</h2>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            {p.name} <button onClick={() => addToShelf(p)}>加入上架</button>
          </li>
        ))}
      </ul>
      <h3>等待上架</h3>
      <ul>
        {shelves.map((s, i) => (
          <li key={i}>{s.name} - 數量: 
            <input type="number" value={s.shelfQty} onChange={e => {
              const newShelves = [...shelves];
              newShelves[i].shelfQty = +e.target.value;
              setShelves(newShelves);
            }} />
          </li>
        ))}
      </ul>
      <button onClick={submit}>上架商品</button>
    </div>
  );
}
