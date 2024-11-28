-- CreateTable
CREATE TABLE "Exercise" (
    "id_exercise" INTEGER NOT NULL,
    "id_company" INTEGER NOT NULL,
    "desc" VARCHAR(255) NOT NULL,
    "obs" VARCHAR(255) NOT NULL,
    "video_dir" VARCHAR(255) NOT NULL,
    "date_created" DATE NOT NULL,
    "date_updated" DATE,
    "date_deleted" DATE,
    "is_deleted" BOOLEAN NOT NULL,
    "id_created_by" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id_exercise")
);

-- CreateTable
CREATE TABLE "Category" (
    "id_category" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "desc" VARCHAR(255) NOT NULL,
    "id_comp" INTEGER NOT NULL,
    "date_created" DATE NOT NULL,
    "date_updated" DATE,
    "date_deleted" DATE,
    "is_deleted" BOOLEAN NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id_plan" INTEGER NOT NULL,
    "id_physio" INTEGER NOT NULL,
    "id_pac" INTEGER NOT NULL,
    "date_start" DATE NOT NULL,
    "date_end" DATE NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id_plan")
);

-- CreateTable
CREATE TABLE "PlanExercise" (
    "id_plan" INTEGER NOT NULL,
    "id_exercise" INTEGER NOT NULL,
    "exercise_desc" BOOLEAN NOT NULL,
    "monday" BOOLEAN NOT NULL,
    "tuesday" BOOLEAN NOT NULL,
    "wednesday" BOOLEAN NOT NULL,
    "thursday" BOOLEAN NOT NULL,
    "friday" BOOLEAN NOT NULL,
    "saturday" BOOLEAN NOT NULL,
    "sunday" BOOLEAN NOT NULL,

    CONSTRAINT "PlanExercise_pkey" PRIMARY KEY ("id_plan","id_exercise")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanExercise" ADD CONSTRAINT "PlanExercise_id_plan_fkey" FOREIGN KEY ("id_plan") REFERENCES "Plan"("id_plan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanExercise" ADD CONSTRAINT "PlanExercise_id_exercise_fkey" FOREIGN KEY ("id_exercise") REFERENCES "Exercise"("id_exercise") ON DELETE RESTRICT ON UPDATE CASCADE;
