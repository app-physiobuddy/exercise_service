//all optional values must default on bd

export interface Category {
    id_category?: number;
    name: string;
    desc: string;
    id_comp: number;
    date_created?: Date;
    date_updated: Date | null;
    date_deleted?: Date | null;
    is_deleted?: boolean;
}

export interface Exercise {
    id_exercise?: number;
    id_company: number;
    name: string;
    desc: string;
    obs: string;
    video_dir: string;
    date_created?: Date;
    date_updated: Date | null;
    date_deleted?: Date | null;
    is_deleted?: boolean;
    id_created_by?: number
    id_category: number;
    //category: Category; 
    //plan_exercises: PlanExercise[];
  }
  
  
  export interface Plan {
    id_plan?: number;
    id_physio: number;
    id_pac: number;
    date_start: Date;
    date_end: Date;
    plan_exercises?: PlanExercise[];
  }

  export interface PlanExercise {
    id_plan: number;
    id_exercise: number;
    exercise_desc: string;
    monday?: boolean;
    monday_done?: boolean;
    tuesday?: boolean;
    tuesday_done?: boolean;
    wednesday?: boolean;
    wednesday_done?: boolean;
    thursday?: boolean;
    thursday_done?: boolean;
    friday?: boolean;
    friday_done?: boolean;
    saturday?: boolean;
    saturday_done?: boolean;
    sunday?: boolean;
    sunday_done?: boolean;
    exercise: Exercise;
    //plan: Plan;
  }

  export interface PatientDoesExercise {
      id_plan: number;
      id_exercise: number;
      id_pac: number;
      monday_done?: boolean;
      tueday_done?: boolean;
      wednesday_done?: boolean;
      thursday_done?: boolean;
      friday_done?: boolean;
      saturday_done?: boolean;
      sunday_done?: boolean;
  }

