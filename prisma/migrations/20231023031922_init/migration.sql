/*
  Warnings:

  - You are about to drop the `Generation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenerationFeedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OutputImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Generation" DROP CONSTRAINT "Generation_userId_fkey";

-- DropForeignKey
ALTER TABLE "GenerationFeedback" DROP CONSTRAINT "GenerationFeedback_generationId_fkey";

-- DropForeignKey
ALTER TABLE "OutputImage" DROP CONSTRAINT "OutputImage_generationId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_userId_fkey";

-- DropTable
DROP TABLE "Generation";

-- DropTable
DROP TABLE "GenerationFeedback";

-- DropTable
DROP TABLE "OutputImage";

-- DropTable
DROP TABLE "Purchase";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "image" TEXT,
    "credits" INTEGER NOT NULL DEFAULT 3,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "stripe_customer_id" VARCHAR,
    "stripe_subscription_id" VARCHAR,
    "stripe_price_id" VARCHAR,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "modelId" TEXT NOT NULL,
    "inferenceId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "image" TEXT,
    "mask" TEXT,
    "structure" TEXT,
    "numInferenceSteps" INTEGER NOT NULL DEFAULT 50,
    "pixelSize" INTEGER NOT NULL DEFAULT 8,
    "modality" TEXT,
    "seed" TEXT,
    "strength" DOUBLE PRECISION,
    "negativePrompt" TEXT,
    "guidance" DOUBLE PRECISION DEFAULT 7.5,
    "numSamples" INTEGER NOT NULL DEFAULT 4,
    "width" INTEGER DEFAULT 512,
    "height" INTEGER DEFAULT 512,
    "type" TEXT DEFAULT 'txt2img',
    "favorites" INTEGER NOT NULL DEFAULT 0,
    "status" "GENERATIONSTATUS" NOT NULL DEFAULT 'PROCESSING',
    "webhookToken" TEXT,
    "colorPaletteEnabled" BOOLEAN NOT NULL DEFAULT false,
    "colors" JSONB,
    "platform" TEXT NOT NULL DEFAULT 'SCENARIO',

    CONSTRAINT "generations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generations_feedback" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "satisfaction" "GENERATIONSATISFCATION" NOT NULL DEFAULT 'NOOPINION',
    "comment" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,

    CONSTRAINT "generations_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "output_image" (
    "id" TEXT NOT NULL,
    "scenarioImageId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "pixelatedImage" TEXT NOT NULL,
    "upscaledImage" TEXT,
    "seed" TEXT,
    "generationId" TEXT NOT NULL,

    CONSTRAINT "output_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "creditAmount" INTEGER NOT NULL,
    "stripe_current_period_end" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_subscription_id_key" ON "users"("stripe_subscription_id");

-- CreateIndex
CREATE INDEX "generations_inferenceId_webhookToken_idx" ON "generations"("inferenceId", "webhookToken");

-- CreateIndex
CREATE INDEX "generations_platform_idx" ON "generations"("platform");

-- CreateIndex
CREATE INDEX "generations_userId_idx" ON "generations"("userId");

-- CreateIndex
CREATE INDEX "generations_modelId_idx" ON "generations"("modelId");

-- CreateIndex
CREATE UNIQUE INDEX "generations_inferenceId_modelId_key" ON "generations"("inferenceId", "modelId");

-- CreateIndex
CREATE UNIQUE INDEX "generations_feedback_generationId_key" ON "generations_feedback"("generationId");

-- CreateIndex
CREATE INDEX "output_image_generationId_idx" ON "output_image"("generationId");

-- CreateIndex
CREATE INDEX "purchases_userId_idx" ON "purchases"("userId");

-- AddForeignKey
ALTER TABLE "generations" ADD CONSTRAINT "generations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generations_feedback" ADD CONSTRAINT "generations_feedback_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "generations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "output_image" ADD CONSTRAINT "output_image_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "generations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
