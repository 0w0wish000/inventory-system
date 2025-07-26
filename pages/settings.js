// pages/settings.js
import { useState, useEffect } from "react";

export default function Settings() {
  const [categories, setCategories] = useState({});
  const [stores, setStores] = useState([]);
  const [newCat, setNewCat] = useState({ parent: "", child: "" });
  const [newStore, setNewStore] = useState("");

  useEffect(() => {
    const cat = JSON.parse(localStorage.getItem("categories") || "{}");
    const sto = JSON.parse(localStorage.getItem("stores") || "[]");
    setCategories(cat);
    setStores(sto);
  }, []);

  const addCategory = () => {
    const updated = { ...categories };
    if (!updated[newCat.parent]) updated[newCat.parent] = [];
    if (!updated[newCat.parent].includes(newCat.child)) {
      updated[newCat.parent].push(newCat.child);
      localStorage.setItem("categories", JSON.stringify(updated));
      setCategories(updated);
    }
    setNewCat({ parent: "", child: "" });
  };

  const addStore = () => {
    if (!stores.includes(newStore)) {
      const updated = [...stores, newStore];
      localStorage.setItem("stores", JSON.stringify(updated));
      setStores(updated);
    }
    setNewStore("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>設定頁面</h2>

      <h3>分類管理</h3>
      <input placeholder="分類" value={newCat.parent} onChange={e => setNewCat({ ...newCat, parent: e.target.value })} />
      <input placeholder="子分類" value={newCat.child} onChange={e => setNewCat({ ...newCat, child: e.target.value })} />
      <button onClick={addCategory}>新增分類</button>
      <ul>
        {Object.entries(categories).map(([parent, children]) => (
          <li key={parent}>
            {parent}: {children.join(", ")}
          </li>
        ))}
      </ul>

      <h3>門市管理</h3>
      <input placeholder="新增門市" value={newStore} onChange={e => setNewStore(e.target.value)} />
      <button onClick={addStore}>新增門市</button>
      <ul>
        {stores.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
}
