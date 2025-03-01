"use client";

import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link for navigation
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CuisineLikesGraph() {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [latestRecipes, setLatestRecipes] = useState<{ id: string; name: string }[]>([]);

  // Fetch cuisine likes data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/recipes/recipe-like");
        if (!res.ok) {
          throw new Error("Failed to fetch cuisine likes data");
        }
        const data = await res.json();

        if (data.cuisineNames && data.cuisineLikes) {
          setChartData({
            labels: data.cuisineNames, // Use Cuisine Names
            datasets: [
              {
                label: "Number of Likes",
                data: data.cuisineLikes,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
              },
            ],
          });
        } else {
          console.error("Data missing in API response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch latest recipes
    const fetchLatestRecipes = async () => {
      try {
        const res = await fetch("/api/recipes/latest");
        if (!res.ok) {
          throw new Error("Failed to fetch latest recipes");
        }
        const data = await res.json();
        setLatestRecipes(data); // Store latest recipes
      } catch (error) {
        console.error("Error fetching latest recipes:", error);
      }
    };

    fetchData();
    fetchLatestRecipes();
  }, []);

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false, // Display all Cuisine names
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: {
        grid: {
          display: true,
        },
        beginAtZero: true,
        max: 100,
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header and Add Recipe Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Likes by Cuisine</h2>
        <Link href="/AdminAddRecipe">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            + Add Recipe
          </button>
        </Link>
      </div>

      {/* Chart */}
      {chartData && <Chart type="bar" data={chartData} options={chartOptions} />}

      {/* Display Latest Recipes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Latest Recipes</h3>
        {latestRecipes.length === 0 ? (
          <p>No recipes available.</p>
        ) : (
          <ul className="space-y-2">
            {latestRecipes.map((recipe) => (
              <li key={recipe.id} className="bg-gray-100 p-2 rounded-md">
                <Link href={`/recipe/${recipe.id}`} className="text-blue-500 hover:underline">
                  {recipe.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
