import ErrorTypes from "../../../../utils/errors/ErrorTypes.js";
class PlanRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPlan(data) {
        try {
            const { plan_exercises, ...planData } = data;
            console.log(data);
            const result = await this.prisma.$transaction(async (prisma) => {
                // Create the plan first
                const createdPlan = await prisma.plan.create({
                    data: planData
                });
                // Create plan exercises
                if (plan_exercises && plan_exercises.length > 0) {
                    await prisma.planExercise.createMany({
                        data: plan_exercises.map(exercise => ({
                            id_plan: createdPlan.id_plan,
                            id_exercise: exercise.id_exercise,
                            exercise_desc: exercise.exercise_desc,
                            monday: exercise.monday,
                            tuesday: exercise.tuesday,
                            wednesday: exercise.wednesday,
                            thursday: exercise.thursday,
                            friday: exercise.friday,
                            saturday: exercise.saturday,
                            sunday: exercise.sunday
                            //
                        }))
                    });
                }
                return createdPlan;
            });
            return true;
        }
        catch (error) {
            console.log(error);
            // Handle specific error cases
            if (error.code === 'P2002') {
                console.error('Error: Unique constraint violation');
                throw ErrorTypes.DatabaseError('Unique constraint violation');
            }
            throw ErrorTypes.DatabaseError('Error creating plan');
        }
    }
    async getPlansByPatientId(id_pac) {
        try {
            const result = await this.prisma.plan.findMany({
                where: { id_pac: id_pac },
                include: {
                    plan_exercises: {
                        include: {
                            exercise: true,
                        },
                    }
                },
            });
            if (result.length === 0) {
                throw ErrorTypes.DatabaseError('No plans found for the given patient ID');
            }
            return result;
        }
        catch (error) {
            throw ErrorTypes.DatabaseError('Error fetching plans');
        }
    }
    async updateSpecificPlanExercise(data) {
        console.log(data);
        try {
            const result = await this.prisma.$transaction(async (prisma) => {
                const queryResult = await this.prisma.plan.findUnique({
                    where: { id_plan: data.id_plan, id_pac: data.id_pac },
                    include: {
                        plan_exercises: true
                    },
                });
                if (!queryResult)
                    throw ErrorTypes.DatabaseError('Error finding plan');
                const { plan_exercises, ...planData } = queryResult;
                if (!queryResult.plan_exercises)
                    throw ErrorTypes.DatabaseError('Error finding plan_exercises');
                console.log("plan_exercises", plan_exercises);
                console.log("planData", planData);
                const { id_exercise, id_plan, id_pac, ...updateData } = data;
                const updateResult = await this.prisma.planExercise.update({
                    where: {
                        id_plan_id_exercise: {
                            id_exercise: id_exercise,
                            id_plan: id_plan
                        }
                    },
                    data: updateData
                });
                if (!updateResult)
                    throw ErrorTypes.DatabaseError('Error updating plan exercise progress');
                return updateResult;
            });
        }
        catch (error) {
            console.log(error);
            throw ErrorTypes.DatabaseError('Error updating plan exercise progress.');
        }
        finally {
            return true;
        }
    }
    async getPlanByIdAndPatientId(id_pac, id_plan) {
        try {
            const result = await this.prisma.plan.findUnique({
                where: { id_plan: id_plan, id_pac: id_pac },
                include: {
                    plan_exercises: {
                        include: {
                            exercise: true,
                        },
                    }
                },
            });
            console.warn(result);
            if (!result)
                throw ErrorTypes.DatabaseError('Error getting Plan. It may not exist');
            return result;
        }
        catch (error) {
            throw ErrorTypes.DatabaseError('Error getting Plan. It may not exist');
        }
    }
}
export default PlanRepository;
