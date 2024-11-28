-- AlterTable
CREATE SEQUENCE category_id_category_seq;
ALTER TABLE "Category" ALTER COLUMN "id_category" SET DEFAULT nextval('category_id_category_seq'),
ALTER COLUMN "date_created" SET DEFAULT CURRENT_TIMESTAMP;
ALTER SEQUENCE category_id_category_seq OWNED BY "Category"."id_category";

-- AlterTable
CREATE SEQUENCE exercise_id_exercise_seq;
ALTER TABLE "Exercise" ALTER COLUMN "id_exercise" SET DEFAULT nextval('exercise_id_exercise_seq'),
ALTER COLUMN "date_created" SET DEFAULT CURRENT_TIMESTAMP;
ALTER SEQUENCE exercise_id_exercise_seq OWNED BY "Exercise"."id_exercise";

-- AlterTable
CREATE SEQUENCE plan_id_plan_seq;
ALTER TABLE "Plan" ALTER COLUMN "id_plan" SET DEFAULT nextval('plan_id_plan_seq');
ALTER SEQUENCE plan_id_plan_seq OWNED BY "Plan"."id_plan";
