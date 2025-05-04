-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fileIds" TEXT[],
ALTER COLUMN "lastName" DROP NOT NULL;
