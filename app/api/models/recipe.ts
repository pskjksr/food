// /models/recipe.model.ts
import prisma from "@/utils/prismaClient";

export interface Recipe {
  id: number;
  name: string;
  description?: string;
  ingredientDetails?: string;
  instructions?: string;
  image?: string;
  cuisineId: number;
  categoryId: number;
}

export const getAllRecipes = async (): Promise<Recipe[]> => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        cuisine: true,
        category: true,
        ingredients: true,
      },
    });
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getRecipeById = async (id: number): Promise<Recipe | null> => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        cuisine: true,
        category: true,
        ingredients: true,
      },
    });
    return recipe;
  } catch (error) {
    console.error(`Error fetching recipe with ID ${id}:`, error);
    throw error;
  }
};

export const createRecipe = async (data: Recipe): Promise<Recipe> => {
  try {
    const newRecipe = await prisma.recipe.create({
      data,
    });
    return newRecipe;
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};

export const updateRecipe = async (id: number, data: Partial<Recipe>): Promise<Recipe> => {
  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data,
    });
    return updatedRecipe;
  } catch (error) {
    console.error(`Error updating recipe with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRecipe = async (id: number): Promise<Recipe> => {
  try {
    const deletedRecipe = await prisma.recipe.delete({
      where: { id },
    });
    return deletedRecipe;
  } catch (error) {
    console.error(`Error deleting recipe with ID ${id}:`, error);
    throw error;
  }
};
