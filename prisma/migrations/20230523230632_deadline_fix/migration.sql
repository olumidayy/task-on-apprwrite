/*
  Warnings:

  - You are about to drop the column `deadline` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "deadline" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deadline";
