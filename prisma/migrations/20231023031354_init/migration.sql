-- CreateEnum
CREATE TYPE "GENERATIONSTATUS" AS ENUM ('PROCESSING', 'COMPLETE', 'FAILED', 'TIMEOUT');

-- CreateEnum
CREATE TYPE "GENERATIONSATISFCATION" AS ENUM ('NOOPINION', 'SATISFIED', 'UNSATISFIED');

-- CreateEnum
CREATE TYPE "PLATFORM" AS ENUM ('SCENARIO', 'REPLICATE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "image" TEXT,
    "credits" INTEGER NOT NULL DEFAULT 3,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripe_customer_id" VARCHAR,
    "stripe_subscription_id" VARCHAR,
    "stripe_price_id" VARCHAR,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Generation" (
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

    CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenerationFeedback" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "satisfaction" "GENERATIONSATISFCATION" NOT NULL DEFAULT 'NOOPINION',
    "comment" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,

    CONSTRAINT "GenerationFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutputImage" (
    "id" TEXT NOT NULL,
    "scenarioImageId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,
    "pixelatedImage" TEXT NOT NULL,
    "upscaledImage" TEXT,
    "seed" TEXT,
    "generationId" TEXT NOT NULL,

    CONSTRAINT "OutputImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "creditAmount" INTEGER NOT NULL,
    "stripe_current_period_end" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_subscription_id_key" ON "users"("stripe_subscription_id");

-- CreateIndex
CREATE INDEX "Generation_inferenceId_webhookToken_idx" ON "Generation"("inferenceId", "webhookToken");

-- CreateIndex
CREATE INDEX "Generation_platform_idx" ON "Generation"("platform");

-- CreateIndex
CREATE INDEX "Generation_userId_idx" ON "Generation"("userId");

-- CreateIndex
CREATE INDEX "Generation_modelId_idx" ON "Generation"("modelId");

-- CreateIndex
CREATE UNIQUE INDEX "Generation_inferenceId_modelId_key" ON "Generation"("inferenceId", "modelId");

-- CreateIndex
CREATE UNIQUE INDEX "GenerationFeedback_generationId_key" ON "GenerationFeedback"("generationId");

-- CreateIndex
CREATE INDEX "OutputImage_generationId_idx" ON "OutputImage"("generationId");

-- CreateIndex
CREATE INDEX "Purchase_userId_idx" ON "Purchase"("userId");

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenerationFeedback" ADD CONSTRAINT "GenerationFeedback_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "Generation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutputImage" ADD CONSTRAINT "OutputImage_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "Generation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
