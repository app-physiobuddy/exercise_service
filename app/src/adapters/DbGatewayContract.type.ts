
export interface DbGatewayContract<C, E> {
    // Categories

    createCategory: (data: C) => Promise<boolean| undefined>;
    // getAllAdmin:
    getCategoriesByCompanyId: (id_comp: number) => Promise<C[] | null>;
    getCategoryById: (id_comp:number, category_id: number) => Promise<C| null>;
    updateCategory: (data: C) => Promise<C| null>;
    deleteCategory: (id_comp:number, category_id: number) => Promise<boolean| undefined>;

    // Exercices
    createExercise: (exercise: E) => Promise<boolean| undefined>;
}
/*
export interface DbGatewayContract {
    // Categories
    categoryUseCases: {
      createCategory: (data: Category) => Promise<boolean | undefined>;
      getCategoriesByCompanyId: (id_comp: number) => Promise<Category[] | null>;
      getCategoryById: (id_comp: number, category_id: number) => Promise<Category | null>;
      updateCategory: (data: Category) => Promise<Category | null>;
      deleteCategory: (id_comp: number, category_id: number) => Promise<boolean | undefined>;
    };
  
    // Exercises
    exerciseUseCases: {
      createExercise: (exercise: Exercise) => Promise<boolean | undefined>;
      // Add other exercise methods as needed
    };
  }
  */