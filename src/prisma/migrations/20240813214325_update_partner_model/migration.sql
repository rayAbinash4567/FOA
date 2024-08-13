/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cellPhone` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cellProvider` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "acceptMMS" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "acceptTexts" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cellPhone" TEXT NOT NULL,
ADD COLUMN     "cellProvider" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "officePhone" TEXT,
ADD COLUMN     "otherCellProvider" TEXT,
ALTER COLUMN "webAddress" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Partner_email_key" ON "Partner"("email");
