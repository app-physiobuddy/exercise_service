import { PrismaClient } from '@prisma/client';
import CategoryRepository from './specific-repositories/CategoryRepository.js';
import ExerciseRepository from './specific-repositories/ExerciseRepository.js';
import PlanRepository from './specific-repositories/PlanRepopsitory.js';
export class PrismaRepository {
    constructor() {
        this.prismaClient = new PrismaClient({
            log: ['query', 'info', 'warn', 'error'],
        });
        this.categoryRepository = new CategoryRepository(this.prismaClient);
        this.exerciseRepository = new ExerciseRepository(this.prismaClient);
        this.planRepository = new PlanRepository(this.prismaClient);
    }
}
export default PrismaRepository;
