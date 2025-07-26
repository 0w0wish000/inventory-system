import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>庫存系統首頁</h1>
      <ul>
        <li><Link href="/purchase">進貨</Link></li>
        <li><Link href="/shelving">上架</Link></li>
        <li><Link href="/orders">訂單</Link></li>
        <li><Link href="/inventory">庫存</Link></li>
        <li><Link href="/reports">報表</Link></li>
        <li><Link href="/settings">設定</Link></li>
      </ul>
    </div>
  );
}