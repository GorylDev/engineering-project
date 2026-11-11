CREATE TABLE "Perfume" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "isDemo" BOOLEAN NOT NULL DEFAULT true,
    "sourceLabel" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    CONSTRAINT "Perfume_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Perfume_slug_format" CHECK ("slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    CONSTRAINT "Perfume_name_not_blank" CHECK (length(btrim("name")) > 0),
    CONSTRAINT "Perfume_description_not_blank" CHECK (length(btrim("description")) > 0),
    CONSTRAINT "Perfume_source_not_blank" CHECK (length(btrim("sourceLabel")) > 0)
);

CREATE UNIQUE INDEX "Perfume_slug_key" ON "Perfume"("slug");
