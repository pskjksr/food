import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 🔹 สร้างหมวดหมู่ Cuisine เริ่มต้น
  const cuisines = [
    { name: 'Chinese Cuisine' },
    { name: 'Clean Eating Cuisine' },
    { name: 'Japanese Cuisine' },
    { name: 'Thai Cuisine' },
    { name: 'Western Cuisine' },
  ];

  for (const cuisine of cuisines) {
    await prisma.cuisine.upsert({
      where: { name: cuisine.name },
      update: {},
      create: cuisine,
    });
  }

  // 🔹 สร้างหมวดหมู่ Category เริ่มต้น
  const categories = [
    { name: 'Appetizer' },
    { name: 'Main Course' },
    { name: 'Dessert' },
    { name: 'Beverage' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log('✅ Seed data added successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
