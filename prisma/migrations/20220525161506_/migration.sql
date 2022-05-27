-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "body" TEXT NOT NULL,
    "images" TEXT[],
    "license" TEXT NOT NULL DEFAULT E'cc-ns-by-sa',
    "draft" BOOLEAN NOT NULL DEFAULT true,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "underRevision" BOOLEAN NOT NULL DEFAULT false,
    "what" TEXT NOT NULL,
    "why" TEXT NOT NULL,
    "previewImage" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "reproductionSteps" JSONB[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
