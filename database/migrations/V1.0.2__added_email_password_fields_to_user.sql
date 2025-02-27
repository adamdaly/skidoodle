-- AlterTable
ALTER TABLE "User" ADD COLUMN "email" VARCHAR(255) NOT NULL, ADD COLUMN "password" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

