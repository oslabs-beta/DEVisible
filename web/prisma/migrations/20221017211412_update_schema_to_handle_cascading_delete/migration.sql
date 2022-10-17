/*
  Warnings:

  - You are about to drop the column `depPrefs` on the `Repo` table. All the data in the column will be lost.
  - Made the column `deps` on table `Build` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Build" DROP CONSTRAINT "Build_repoId_fkey";

-- DropForeignKey
ALTER TABLE "Repo" DROP CONSTRAINT "Repo_userId_fkey";

-- AlterTable
ALTER TABLE "Build" ALTER COLUMN "deps" SET NOT NULL;

-- AlterTable
ALTER TABLE "Repo" DROP COLUMN "depPrefs";

-- AddForeignKey
ALTER TABLE "Repo" ADD CONSTRAINT "Repo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
