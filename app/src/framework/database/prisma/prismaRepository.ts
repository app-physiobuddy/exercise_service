import { PrismaClient, Prisma, Exercise } from '@prisma/client'
import { DbGatewayContract, PlanRepositoryInterface } from '../../../adapters/DbGatewayContract.type.js'
import CategoryRepository from './specific-repositories/CategoryRepository.js'
import ExerciseRepository from './specific-repositories/ExerciseRepository.js'
import PlanRepository from './specific-repositories/PlanRepopsitory.js'



export class PrismaRepository implements DbGatewayContract {
  private prismaClient: PrismaClient;
  categoryRepository: DbGatewayContract['categoryRepository'];
  exerciseRepository: DbGatewayContract['exerciseRepository'];
  planRepository: DbGatewayContract['planRepository'];

  constructor() {
    this.prismaClient = new PrismaClient({
      log: ['query', 'info', 'warn', 'error']
    });

    this.categoryRepository = new CategoryRepository(this.prismaClient);
    this.exerciseRepository = new ExerciseRepository(this.prismaClient);
    this.planRepository = new PlanRepository(this.prismaClient);
  }
}

export default PrismaRepository