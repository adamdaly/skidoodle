-- CreateTable
CREATE TABLE "Users_Scenes" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "sceneid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_Scenes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users_Scenes" ADD CONSTRAINT "Users_Scenes_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Scenes" ADD CONSTRAINT "Users_Scenes_sceneid_fkey" FOREIGN KEY ("sceneid") REFERENCES "Scene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

