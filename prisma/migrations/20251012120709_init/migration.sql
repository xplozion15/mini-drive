-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "googleId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");
