"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

export default function Recipevisitsgraph() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );

  const chartData = {
    // ป้ายชื่อ
    labels: [
      "",
      "Japanese",
      "Thai",
      "Chinese",
      "Western",
      "Clean Eating",
      
    ],
    datasets: [
      {
        label: "Viewers", // ชื่อในกราฟ
        data: [0, 6, 24, 22, 14, 6, 40, 26, 19, 20, 20, 10], // พล็อตกราฟเป็นข้อมูลตัวเลข
        borderWidth: 2, // ความหนาของเส้น
        borderColor: "#44fdee", // สีของเส้น อันนี้เป็นสีฟ้า
      },
      {
        label: "Foods", // ชื่อในกราฟ
        data: [0, 15, 34, 15, 5, 6, 7, 23, 22, 21, 27, 14], // พล็อตกราฟเป็นข้อมูลตัวเลข
        borderWidth: 2, // ความหนาของเส้น
        borderColor: "#fec50d", // สีของเส้น อันนี้เป็นสีทอง
      },
    ],
  };
  const chartOptions = {
    scales: {
      // ไม่แสดงเส้นกราฟแนวนอน
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-6 max-w-xl mx-auto font-sans">
      <h2 className="flex items-center text-2xl mb-6 text-gray-800">
        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2"></span>
        Recipe visits graph
      </h2>
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}
