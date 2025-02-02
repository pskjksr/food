import React, { useState, useEffect } from "react";
export default function RecipeCategories() {
  const [categories, setCategories] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    dessert: [],
    drink: [],
  });
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.API_URL || "http://localhost:3000";

  const fetchData = async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/api/recipes?categoryId=${categoryId}`);
      return response.json();
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const [breakfast, lunch, dinner, dessert, drink] = await Promise.all([
        fetchData(21),
        fetchData(23),
        fetchData(22),
        fetchData(24),
        fetchData(25),
      ]);
      setCategories({ breakfast, lunch, dinner, dessert, drink });
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <LoadingSkeleton />
      </div>
    );
  }

  const renderCategory = (categoryData, categoryTitle) => (
    <div className="recipe-category">
      <div className="ml-5 font-semibold text-lg text-gray-700">
        <h2>{categoryTitle}</h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5 p-5">
        {categoryData.slice(0, 5).map((item) => (
          <div key={item.id} className="recipe-card">
            <div className="flex justify-center p-2">
              <img
                src={item.image ? `${API_URL}/${item.image}` : "/fallback-image.jpg"}
                alt={item.name || "Recipe Image"}
                className="w-40 h-40 object-cover rounded-md"
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />
            </div>
            <div className="relative p-4 text-center">
              <h3 className="mb-4 font-semibold text-lg">{item.name}</h3>
              {item.id ? (
                <Link href={`/RecipeDescription/${item.id}`}>
                  <button className="recipe-button">RECIPE</button>
                </Link>
              ) : (
                <p className="text-gray-500 text-sm">Recipe coming soon!</p>
              )}
            </div>
            <i className="favorite-icon"></i>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="recipe-section">
      {renderCategory(categories.breakfast, "Breakfast")}
      {renderCategory(categories.lunch, "Lunch")}
      {renderCategory(categories.dinner, "Dinner")}
      {renderCategory(categories.dessert, "Dessert")}
      {renderCategory(categories.drink, "Drink")}
    </section>
  );
}
