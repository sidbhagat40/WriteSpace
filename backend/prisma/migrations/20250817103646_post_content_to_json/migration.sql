-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "content" SET DATA TYPE JSONB USING "content"::jsonb;