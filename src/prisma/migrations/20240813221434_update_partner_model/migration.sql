/*
  Warnings:

  - A unique constraint covering the columns `[cellPhone]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Partner_cellPhone_key" ON "Partner"("cellPhone");
