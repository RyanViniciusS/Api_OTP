/*
  Warnings:

  - You are about to drop the column `ativo` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dtcriacao` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Empresa` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nome` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_empresaId_fkey";

-- DropIndex
DROP INDEX "User_cpf_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ativo",
DROP COLUMN "cpf",
DROP COLUMN "dtcriacao",
DROP COLUMN "empresaId",
ADD COLUMN     "nome" TEXT NOT NULL;

-- DropTable
DROP TABLE "Empresa";
