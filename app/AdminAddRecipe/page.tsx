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
  const [image, setImage] = useState<File | null>(null);
  const [cuisineId, setCuisineId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [ingredientName, setIngredientName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // Add ingredient to the list
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

  // Remove ingredient from the list
  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!name || !cuisineId || !categoryId || ingredients.length === 0) {
      setError("กรุณากรอก Name, Cuisine, Category และ Ingredients ให้ครบ");
      return;
    }

    // Prepare form data to include the image file
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("ingredientDetails", ingredientDetails);
    formData.append("instructions", instructions);
    if (image) {
      formData.append("image", image); // Append the image file
    }
    formData.append("cuisineId", cuisineId);
    formData.append("categoryId", categoryId);

    // Check if ingredients array is valid before appending
    if (ingredients.length > 0) {
      formData.append("ingredients", JSON.stringify(ingredients)); // Send ingredients array as JSON
    } else {
      setError("กรุณาเพิ่มส่วนผสมให้ครบ");
      return;
    }

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        body: formData, // Send form data with image
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to add recipe.");
      } else {
        router.push("/Recipevisitsgraph");
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

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
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
            <option value="13">Chinese Recipes</option>
            <option value="15">Clean Eating Recipes</option>
            <option value="11">Japanese Recipes</option>
            <option value="12">Thai Recipes</option>
            <option value="14">Western Recipes</option>
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
            <option value="21">Breakfast</option>
            <option value="24">Dessert</option>
            <option value="22">Dinner</option>
            <option value="25">Drink</option>
            <option value="23">Lunch</option>
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
