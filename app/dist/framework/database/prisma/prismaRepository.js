import { PrismaClient } from '@prisma/client';
import CategoryRepository from './specific-repositories/CategoryRepository.js';
import ExerciseRepository from './specific-repositories/ExerciseRepository.js';
export class PrismaRepository {
    constructor() {
        this.prismaClient = new PrismaClient();
        this.categoryRepository = new CategoryRepository(this.prismaClient);
        this.exerciseRepository = new ExerciseRepository(this.prismaClient);
    }
}
export default PrismaRepository;
