/*
  Warnings:

  - You are about to drop the column `stripe_current_period_end` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_customer_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_price_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_subscription_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `generations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `generations_feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `output_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "generations" DROP CONSTRAINT "generations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "generations_feedback" DROP CONSTRAINT "generations_feedback_generationId_fkey";

-- DropForeignKey
ALTER TABLE "output_image" DROP CONSTRAINT "output_image_generationId_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_user_id_fkey";

-- DropIndex
DROP INDEX "users_stripe_customer_id_key";

-- DropIndex
DROP INDEX "users_stripe_subscription_id_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "stripe_current_period_end",
DROP COLUMN "stripe_customer_id",
DROP COLUMN "stripe_price_id",
DROP COLUMN "stripe_subscription_id";

-- DropTable
DROP TABLE "generations";

-- DropTable
DROP TABLE "generations_feedback";

-- DropTable
DROP TABLE "output_image";

-- DropTable
DROP TABLE "purchases";

-- DropEnum
DROP TYPE "GENERATIONSATISFCATION";

-- DropEnum
DROP TYPE "GENERATIONSTATUS";

-- DropEnum
DROP TYPE "PLATFORM";

-- CreateTable
CREATE TABLE "generations_images" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "model_id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "image_ai" TEXT NOT NULL,
    "image_swapped" TEXT NOT NULL,

    CONSTRAINT "generations_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "generations_images_user_id_key" ON "generations_images"("user_id");

-- CreateIndex
CREATE INDEX "generations_images_user_id_idx" ON "generations_images"("user_id");

-- AddForeignKey
ALTER TABLE "generations_images" ADD CONSTRAINT "generations_images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
