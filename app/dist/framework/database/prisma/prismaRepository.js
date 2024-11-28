import { PrismaClient, Prisma } from '@prisma/client';
import ErrorTypes from '../../../utils/errors/ErrorTypes.js';
export class PrismaRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }
    // Exercise Category Methods
    async createCategory(data) {
        //Prisma.CategoryCreateInput
        try {
            const result = await this.prisma.category.create({ data });
            if (!result)
                throw ErrorTypes.DatabaseError('Error creating category');
            return true;
        }
        catch (error) {
            if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
                console.error('Error: Entry with this name already exists.');
                throw ErrorTypes.DatabaseError('Name already exists');
            }
            throw ErrorTypes.DatabaseError('Error creating category');
        }
    }
    async getCategoryById(id_comp, category_id) {
        try {
            const result = await this.prisma.category.findUnique({
                where: { id_category: category_id, id_comp: id_comp },
            });
            console.warn(result);
            if (!result)
                throw ErrorTypes.DatabaseError('Error getting category. It may not exist');
            return result;
        }
        catch (error) {
            throw ErrorTypes.DatabaseError('Error getting category. It may not exist');
        }
    }
    async updateCategory(data) {
        try {
            return await this.prisma.category.update({
                where: { id_category: data.id_category, id_comp: data.id_comp },
                data
            });
        }
        catch (error) {
            throw ErrorTypes.DatabaseError('Error updating category.');
        }
    }
    async getCategoriesByCompanyId(id_comp) {
        try {
            const result = await this.prisma.category.findMany({
                where: { id_comp },
            });
            console.warn(result);
            if (result.length === 0) {
                throw ErrorTypes.DatabaseError('No categories found for the given company ID');
            }
            return result;
        }
        catch (error) {
            throw ErrorTypes.DatabaseError('Error fetching categories');
        }
    }
    async deleteCategory(id_comp, id_category) {
        console.log("RUNS");
        try {
            const result = await this.prisma.category.update({
                where: { id_category: id_category, id_comp: id_comp },
                data: {
                    is_deleted: true,
                    date_deleted: new Date()
                }
            });
            if (!result)
                throw ErrorTypes.DatabaseError('Error deleting category');
            return true;
        }
        catch (error) {
            throw ErrorTypes.DatabaseError('Error deleting category');
        }
    }
    // Exercise Methods
    async createExercise(data) {
        try {
            const result = await this.prisma.exercise.create({ data });
            if (!result)
                throw ErrorTypes.DatabaseError('Error creating exercise');
            return true;
        }
        catch (error) {
            throw ErrorTypes.DatabaseError('Error deleting exercise');
        }
    }
    /*
      async getExerciseById(id: number) {
        try {
          return await this.prisma.exercise.findUnique({
            where: { id_exercise: id },
            include: { category: true }
          })
        } catch (error) {
          this.handleError(error, 'getExerciseById')
        }
      }
    
      async updateExercise(
        id: number,
        data: Prisma.ExerciseUpdateInput
      ) {
        try {
          return await this.prisma.exercise.update({
            where: { id_exercise: id },
            data
          })
        } catch (error) {
          this.handleError(error, 'updateExercise')
        }
      }
    
      async deleteExercise(id: number) {
        try {
          return await this.prisma.exercise.update({
            where: { id_exercise: id },
            data: {
              is_deleted: true,
              date_deleted: new Date()
            }
          })
        } catch (error) {
          this.handleError(error, 'deleteExercise')
        }
      }
    
      // Plan Methods
      async createPlan(data: Prisma.PlanCreateInput) {
        try {
          return await this.prisma.plan.create({ data })
        } catch (error) {
          this.handleError(error, 'createPlan')
        }
      }
    
      async getPlanById(id: number) {
        try {
          return await this.prisma.plan.findUnique({
            where: { id_plan: id },
            include: { plan_exercises: true }
          })
        } catch (error) {
          this.handleError(error, 'getPlanById')
        }
      }
    
      async updatePlan(
        id: number,
        data: Prisma.PlanUpdateInput
      ) {
        try {
          return await this.prisma.plan.update({
            where: { id_plan: id },
            data
          })
        } catch (error) {
          this.handleError(error, 'updatePlan')
        }
      }
    
      // Plan Exercise Methods
      async createPlanExercise(data: Prisma.PlanExerciseCreateInput) {
        try {
          return await this.prisma.planExercise.create({ data })
        } catch (error) {
          this.handleError(error, 'createPlanExercise')
        }
      }
    
      async getPlanExercisesByPlanId(planId: number) {
        try {
          return await this.prisma.planExercise.findMany({
            where: { id_plan: planId },
            include: {
              exercise: true,
              plan: true
            }
          })
        } catch (error) {
          this.handleError(error, 'getPlanExercisesByPlanId')
        }
           
      }
          */
    // Utility Methods
    handleError(error, method) {
        console.error(`Error in ${method}:`, error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Prisma specific error handling
            //@ts-ignore
            if (error.code === 'P2002') {
                throw new Error('Unique constraint violation');
            }
            //@ts-ignore
            if (error.code === 'P2025') {
                throw new Error('Record not found');
            }
        }
        throw error;
    }
}
