-- AlterTable
ALTER TABLE "TradingPlan" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "TradingPlan_userId_idx" ON "TradingPlan"("userId");
