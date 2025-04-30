import { useState } from "react";
import { Search } from "lucide-react";

export default function LandValueEstimator() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/property-info?address=${encodeURIComponent(address)}`);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setResult({
        lotSize: "错误",
        zoning: "错误",
        neighbourhood: "错误",
        landPricePerSqft: "无法获取",
        newHomeSaleRange: "无法获取"
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">土地价值智能评估</h1>
      <div className="flex gap-2 items-center mb-4">
        <input
          className="flex-1 p-2 border border-gray-300 rounded"
          placeholder="请输入地址，如 3025 W 11th Ave"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "分析中..." : <><Search className="inline mr-1" size={16} /> 开始评估</>}
        </button>
      </div>

      {result && (
        <div className="bg-gray-100 p-4 rounded space-y-2">
          <p><strong>地址</strong>：{address}</p>
          <p><strong>土地面积</strong>：{result.lotSize}</p>
          <p><strong>分区类型</strong>：{result.zoning}</p>
          <p><strong>所在区域</strong>：{result.neighbourhood}</p>
          <p><strong>土地近期均价</strong>：{result.landPricePerSqft}</p>
          <p><strong>新建房售价区间</strong>：{result.newHomeSaleRange}</p>
        </div>
      )}
    </div>
  );
}
