-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "browser" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "device" TEXT,
ADD COLUMN     "os" TEXT,
ADD COLUMN     "referer" TEXT,
ALTER COLUMN "path" DROP NOT NULL;
