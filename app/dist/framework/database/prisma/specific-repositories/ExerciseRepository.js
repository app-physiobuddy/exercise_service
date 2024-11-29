import ErrorTypes from "../../../../utils/errors/ErrorTypes.js";
class ExerciseRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createExercise(data) {
        console.log(data);
        try {
            const result = await this.prisma.exercise.create({ data });
            if (!result)
                throw ErrorTypes.DatabaseError('Error creating exercise');
            return true;
        }
        catch (error) {
            console.log(error);
            throw ErrorTypes.DatabaseError('Error creating exercise');
        }
    }
    async test() {
        return true;
    }
}
export default ExerciseRepository;
