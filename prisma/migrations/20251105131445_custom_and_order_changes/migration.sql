/*
  Warnings:

  - You are about to drop the column `message` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "cpfCnpj" SET DATA TYPE VARCHAR(14);

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "message";
