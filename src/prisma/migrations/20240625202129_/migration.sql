/*
  Warnings:

  - You are about to drop the column `partnerId` on the `Partner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Partner_partnerId_key";

-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "partnerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Partner_userId_key" ON "Partner"("userId");
