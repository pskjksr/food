"use client";

import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function RecipeVisitsGraph() {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; borderWidth: number; borderColor: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [latestRecipes, setLatestRecipes] = useState<{ id: string; name: string }[]>([]); // Latest recipes

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch statistics for recipe views
        const res = await fetch("/api/recipe-views");
        if (!res.ok) {
          throw new Error("Failed to fetch recipe views data");
        }
        const data = await res.json();

        if (data.categories && data.categoryVisits) {
          setChartData({
            labels: data.categories,
            datasets: [
              {
                label: "Recipe Views",
                data: data.categoryVisits,
                borderWidth: 2,
                borderColor: "#44fdee",
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

  const chartOptions = {
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center text-2xl text-gray-800">
          <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2"></span>
          Recipe Visits Graph
        </h2>

        {/* Add Recipe Button */}
        <Link href="/AdminAddRecipe">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            + Add Recipe
          </button>
        </Link>
      </div>

      {/* Display the chart */}
      {chartData && <Chart type="line" data={chartData} options={chartOptions} />}

      {/* Display the latest recipes */}
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
