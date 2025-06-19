-- CreateTable
CREATE TABLE "Download" (
    "id" TEXT NOT NULL,
    "playlistUrl" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "numberOfVideos" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Download_pkey" PRIMARY KEY ("id")
);
