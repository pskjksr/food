"use client";

import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Recipevisitsgraph() {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; borderWidth: number; borderColor: string }[];
  } | null>(null); // ใช้ null เป็นค่าเริ่มต้น
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ดึงข้อมูลจาก API
    const fetchData = async () => {
      try {
        const res = await fetch("/api/recipe-views");
        const data = await res.json();

        // ตรวจสอบว่ามีข้อมูลก่อนที่จะแก้ไข chartData
        if (data.categories && data.categoryVisits) {
          setChartData({
            labels: data.categories,
            datasets: [
              {
                label: "Recipe Views", // ชื่อในกราฟ
                data: data.categoryVisits, // ข้อมูลจำนวนการเข้าชม
                borderWidth: 2,
                borderColor: "#44fdee",
              },
            ],
          });
        } else {
          console.error("Data missing in API response.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  // กรณีข้อมูลยังไม่ได้โหลด
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto font-sans">
      <h2 className="flex items-center text-2xl mb-6 text-gray-800">
        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2"></span>
        Recipe Visits Graph
      </h2>
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}
