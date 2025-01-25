import prisma from '../db/prisma';

interface RecipeData {
  name: string;
  description?: string;
  ingredientDetails?: string;
  instructions?: string;
  cuisineId: number;
  image?: string;
  categoryId: number;
}

export const getAllRecipes = async () => {
  return await prisma.recipe.findMany({
    include: {
      cuisine: true,
      category: true,
      ingredients: true,
    },
  });
};

export const getRecipeById = async (id: number) => {
  return await prisma.recipe.findUnique({
    where: { id },
    include: {
      cuisine: true,
      category: true,
      ingredients: true,
    },
  });
};

export const createRecipe = async (data: RecipeData) => {
  return await prisma.recipe.create({
    data,
  });
};

export const updateRecipe = async (id: number, data: Partial<RecipeData>) => {
  return await prisma.recipe.update({
    where: { id },
    data,
  });
};

export const deleteRecipe = async (id: number) => {
  return await prisma.recipe.delete({
    where: { id },
  });
};
