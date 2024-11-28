export interface Category {
    id_category?: number; //defaults on prisma db
    name: string;
    desc: string;
    id_comp: number;
    date_created?: Date; //defaults on prisma db
    date_updated: Date | null;
    date_deleted?: Date | null;
    is_deleted?: boolean;
}

export interface Exercise {
    id_exercise: number;
    id_company: number;
    desc: string;
    obs: string;
    video_dir: string;
    date_created: Date;
    date_updated?: Date | null;
    date_deleted?: Date | null;
    is_deleted: boolean;
    id_created_by: number;
    id_category: number;
    category: Category; 
    //plan_exercises: PlanExercise[];
  }
  
  export interface Plan {
    id_plan: number;
    id_physio: number;
    id_pac: number;
    date_start: Date;
    date_end: Date;
    plan_exercises: PlanExercise[];
  }

  export interface PlanExercise {
    id_plan: number;
    id_exercise: number;
    exercise_desc: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    plan: Plan;
    exercise: Exercise;
  }

  /*
  async function getPlanWithExercises(planId: number): Promise<Plan> {
  const plan = await prisma.plan.findUnique({
    where: { id_plan: planId },
    include: {
      plan_exercises: {
        include: {
          exercise: true,
        },
      },
    },
  });
  return plan as Plan;
}

  */