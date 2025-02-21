"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type RecipeIngredient = {
  name: string;
};

function AdminAddRecipe() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientDetails, setIngredientDetails] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [cuisineId, setCuisineId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [ingredientName, setIngredientName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // เพิ่มชื่อส่วนผสมใหม่ในรายการ
  const addIngredient = () => {
    if (!ingredientName) {
      return;
    }
    const newIngredient: RecipeIngredient = {
      name: ingredientName,
    };
    setIngredients([...ingredients, newIngredient]);
    setIngredientName("");
  };

  // ลบส่วนผสมออกจากรายการโดยใช้ index
  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // ตรวจสอบฟิลด์ที่จำเป็น
    if (!name || !cuisineId || !categoryId) {
      setError("Please fill in all required fields (Name, Cuisine, Category).");
      return;
    }

    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          ingredientDetails,
          instructions,
          image,
          cuisineId: parseInt(cuisineId, 10),
          categoryId: parseInt(categoryId, 10),
          ingredients, // ส่ง array ของส่วนผสมที่มีแค่ { name }
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to add recipe.");
      } else {
        router.push("/admin/recipes");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Recipe</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipe Name */}
        <div>
          <label className="block font-medium">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Recipe Name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Short description of the recipe"
          />
        </div>

        {/* Ingredient Details */}
        <div>
          <label className="block font-medium">Ingredient Details</label>
          <textarea
            value={ingredientDetails}
            onChange={(e) => setIngredientDetails(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="List of ingredients"
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="block font-medium">Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Cooking instructions"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Image URL"
          />
        </div>

        {/* Cuisine Dropdown */}
        <div>
          <label className="block font-medium">Cuisine *</label>
          <select
            value={cuisineId}
            onChange={(e) => setCuisineId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Cuisine</option>
            <option value="13">ChineseRecipes</option>
            <option value="15">CleanEatingRecipes</option>
            <option value="11">japaneseRecipes</option>
            <option value="12">thaiRecipes</option>
            <option value="14">WesternRecipes</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block font-medium">Category *</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="21">breakfast</option>
            <option value="24">dessert</option>
            <option value="22">dinner</option>
            <option value="25">drink</option>
            <option value="23">lunch</option>
          </select>
        </div>

        {/* Ingredients Section */}
        <div>
          <label className="block font-medium">Ingredients</label>
          <div className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded"
              >
                <span>{ingredient.name}</span>
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {/* Field to add a new ingredient */}
          <div className="flex space-x-2 mt-2">
            <input
              type="text"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              className="border p-2 rounded flex-1"
              placeholder="Ingredient name"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AdminAddRecipe;
