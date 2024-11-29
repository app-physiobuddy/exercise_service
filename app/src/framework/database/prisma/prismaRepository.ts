import { PrismaClient, Prisma, Exercise } from '@prisma/client'
import { DbGatewayContract } from '../../../adapters/DbGatewayContract.type.js'
import CategoryRepository from './specific-repositories/CategoryRepository.js'
import ExerciseRepository from './specific-repositories/ExerciseRepository.js'



export class PrismaRepository implements DbGatewayContract {
  private prismaClient: PrismaClient;
  categoryRepository: DbGatewayContract['categoryRepository'];
  exerciseRepository: DbGatewayContract['exerciseRepository'];

  constructor() {
    this.prismaClient = new PrismaClient();

    this.categoryRepository = new CategoryRepository(this.prismaClient);
    this.exerciseRepository = new ExerciseRepository(this.prismaClient);
  }
}

export default PrismaRepository