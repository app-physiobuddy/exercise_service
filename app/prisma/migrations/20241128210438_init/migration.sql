/*
  Warnings:

  - A unique constraint covering the columns `[id_comp,name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category_id_comp_name_key" ON "Category"("id_comp", "name");
