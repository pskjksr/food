/*
  Warnings:

  - You are about to drop the column `difficultyLevel` on the `recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `recipe` DROP COLUMN `difficultyLevel`,
    ADD COLUMN `image` VARCHAR(191) NULL;
