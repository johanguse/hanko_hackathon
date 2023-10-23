/*
  Warnings:

  - You are about to drop the column `userId` on the `generations` table. All the data in the column will be lost.
  - You are about to drop the column `creditAmount` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `generations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `purchases` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `generations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credit_amount` to the `purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "generations" DROP CONSTRAINT "generations_userId_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_userId_fkey";

-- DropIndex
DROP INDEX "generations_userId_idx";

-- DropIndex
DROP INDEX "purchases_userId_idx";

-- AlterTable
ALTER TABLE "generations" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "creditAmount",
DROP COLUMN "userId",
ADD COLUMN     "credit_amount" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "generations_user_id_key" ON "generations"("user_id");

-- CreateIndex
CREATE INDEX "generations_user_id_idx" ON "generations"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "purchases_user_id_key" ON "purchases"("user_id");

-- CreateIndex
CREATE INDEX "purchases_user_id_idx" ON "purchases"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- AddForeignKey
ALTER TABLE "generations" ADD CONSTRAINT "generations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
