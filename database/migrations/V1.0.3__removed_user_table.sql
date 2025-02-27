-- DropForeignKey
ALTER TABLE "Animation" DROP CONSTRAINT "Animation_userid_fkey";

-- DropForeignKey
ALTER TABLE "Scene" DROP CONSTRAINT "Scene_userid_fkey";

-- DropForeignKey
ALTER TABLE "Users_Scenes" DROP CONSTRAINT "Users_Scenes_userid_fkey";

-- AlterTable
ALTER TABLE "Animation" ALTER COLUMN "userid" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Scene" ALTER COLUMN "userid" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Users_Scenes" ALTER COLUMN "userid" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "User";

