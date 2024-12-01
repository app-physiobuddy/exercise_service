import ErrorTypes from "../../../../utils/errors/ErrorTypes.js";
class ExerciseRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createExercise(data) {
        try {
            const result = await this.prisma.exercise.create({ data });
            if (!result)
                throw ErrorTypes.DatabaseError('Error creating exercise');
            return true;
        }
        catch (error) {
            if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
                console.error('Error: Entry with this name already exists.');
                throw ErrorTypes.DatabaseError('Name already exists');
            }
            throw ErrorTypes.DatabaseError('Error creating exercise');
        }
    }
    async getExercisesByCompanyId(id_comp) {
        console.log("getExercisesByCompanyId repo called");
        try {
            const result = await this.prisma.exercise.findMany({
                where: { id_company: id_comp },
            });
            if (result.length === 0) {
                throw ErrorTypes.DatabaseError('No exercises found for the given company ID');
            }
            return result;
        }
        catch (error) {
            throw ErrorTypes.DatabaseError('Error fetching exercises');
        }
    }
    async getExerciseById(id_comp, id_exercise) {
        try {
            const result = await this.prisma.exercise.findUnique({
                where: { id_exercise: id_exercise, id_company: id_comp },
            });
            console.warn(result);
            if (!result)
                throw ErrorTypes.DatabaseError('Error getting exercise. It may not exist');
            return result;
        }
        catch (error) {
            throw ErrorTypes.DatabaseError('Error getting exercise. It may not exist');
        }
    }
    async updateExercise(data) {
        console.log(data);
        try {
            return await this.prisma.exercise.update({
                where: { id_exercise: data.id_exercise, id_company: data.id_company },
                data
            });
        }
        catch (error) {
            console.log(error);
            throw ErrorTypes.DatabaseError('Error updating exercise.');
        }
    }
    async deleteExercise(id_comp, id_exercise) {
        console.log(id_comp, id_exercise);
        try {
            const result = await this.prisma.exercise.update({
                where: { id_exercise: id_exercise, id_company: id_comp },
                data: {
                    is_deleted: true,
                    date_deleted: new Date()
                }
            });
            if (!result)
                throw ErrorTypes.DatabaseError('Error deleting exercise');
            return true;
        }
        catch (error) {
            console.log(error);
            throw ErrorTypes.DatabaseError('Error deleting exercise');
        }
    }
}
export default ExerciseRepository;
