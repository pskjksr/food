import prisma from "../db/prisma"; // ตรวจสอบว่า import database connection ถูกต้อง

export const getRecipesByCategory = async (categoryId: number) => {
  return await prisma.recipe.findMany({
    where: { categoryId },
    include: {
      cuisine: true,
      category: true,
      ingredients: true,
    },
  });
};
