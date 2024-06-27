/*
  Warnings:

  - The primary key for the `Partner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[partnerId]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Partner` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "Partner_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_partnerId_key" ON "Partner"("partnerId");
